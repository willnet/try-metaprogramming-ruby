import { RubyVM } from "@ruby/wasm-wasi";
import { File, WASI, OpenFile, ConsoleStdout } from "@bjorn3/browser_wasi_shim";
import { problems } from "./problems.js";

class RubyRunner {
  constructor() {
    this.rubyVM = null;
    this.initialized = false;
    this.testCode = null;
  }

  // Ruby.wasmの初期化
  async initialize() {
    if (this.initialized) return;

    try {
      this.rubyVM = await this.createVM();

      // minitestが利用可能か確認
      this.rubyVM.eval(`
        begin
          require 'minitest'
          true
        rescue LoadError
          false
        end
      `);

      this.initialized = true;
      console.log("Ruby.wasm initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Ruby.wasm:", error);
      throw error;
    }
  }

  async createVM() {
    let output = [];
    output.flush = function () {
      return this.splice(0, this.length).join("\n");
    };

    const setStdout = function (val) {
      console.log(val);
      output.push(val);
    };

    const setStderr = function (val) {
      console.warn(val);
      output.push(`[warn] ${val}`);
    };

    // ここでVMを手動でセットアップする
    const fds = [
      new OpenFile(new File([])), // stdin
      ConsoleStdout.lineBuffered(setStdout), // stdout
      ConsoleStdout.lineBuffered(setStderr), // stderr
    ];
    const wasi = new WASI([], [], fds, { debug: false });
    const vm = new RubyVM();
    const imports = {
      wasi_snapshot_preview1: wasi.wasiImport,
    };
    vm.addToImports(imports);
    const response = await fetch("https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@2.7.1/dist/ruby+stdlib.wasm");
    const module = await WebAssembly.compileStreaming(response);
    const instance = await WebAssembly.instantiate(module, imports);
    await vm.setInstance(instance);

    wasi.initialize(instance);
    vm.initialize();

    // 最後に、出力への参照を手作りVMオブジェクトに保存する
    vm.$output = output;
    return vm;
  }

  // テストコードを設定
  setTestCode(testCode) {
    this.testCode = testCode;
    console.log("Test code set successfully");
  }

  // VMをリセット
  async resetVM() {
    this.rubyVM = null;
    this.initialized = false;
    await this.initialize();
  }

  // 問題IDに基づいて実行順序を決定
  getExecutionOrder(problemId) {
    // テストフレームワークと同じロジックを適用
    const testFirstProblems = ['01_block_first_step', '01_class_definition_first_step'];
    return testFirstProblems.includes(problemId) ? 'test_first' : 'code_first';
  }

  // ユーザーコードとテストコードを実行
  async runTest(userCode, problemId = null) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.testCode) {
      throw new Error("テストコードが設定されていません");
    }

    try {
      // 出力をクリア
      this.rubyVM.$output.length = 0;

      // 実行順序を決定
      const executionOrder = this.getExecutionOrder(problemId);

      if (executionOrder === 'test_first') {
        // テストコードを先に評価（クラス定義など）
        this.rubyVM.eval(this.testCode);
        // ユーザーコードを後で評価
        this.rubyVM.eval(userCode);
      } else {
        // 通常の順序：ユーザーコードを先に評価
        this.rubyVM.eval(userCode);
        // テストコードを後で評価
        this.rubyVM.eval(this.testCode);
      }

      // 明示的にテストを実行
      this.rubyVM.eval("run_tests");

      return {
        output: this.rubyVM.$output,
        success: !this.rubyVM.$output.join("\n").includes("Failure:") && !this.rubyVM.$output.join("\n").includes("Error:")
      };
    } catch (error) {
      console.error("Error running test:", error);
      return {
        output: [error.message || "Unknown error occurred"],
        success: false
      };
    }
  }
}

// 問題管理クラス
class ProblemManager {
  constructor(problems) {
    this.problems = problems;
    this.sections = this.extractSections();
    this.currentProblem = null;
  }

  // セクションの抽出
  extractSections() {
    const sections = new Set();
    this.problems.forEach(problem => {
      sections.add(problem.section);
    });
    return Array.from(sections).sort();
  }

  // セクション内の問題を取得
  getProblemsInSection(section) {
    return this.problems.filter(problem => problem.section === section);
  }

  // 問題を取得
  getProblem(section, id) {
    return this.problems.find(problem => problem.section === section && problem.id === id);
  }

  // 現在の問題を設定
  setCurrentProblem(section, id) {
    this.currentProblem = this.getProblem(section, id);
    return this.currentProblem;
  }
}

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  const sectionSelect = document.getElementById('section-select');
  const problemSelect = document.getElementById('problem-select');
  const descriptionText = document.getElementById('description-text');
  const detailedDescriptionText = document.getElementById('detailed-description-text');
  const codeEditor = document.getElementById('code-editor');
  const runButton = document.getElementById('run-button');
  const resetButton = document.getElementById('reset-button');
  const testResult = document.getElementById('test-result');
  const loading = document.getElementById('loading');

  const rubyRunner = new RubyRunner();
  const problemManager = new ProblemManager(problems);

  // セクション選択肢の初期化
  function initSectionSelect() {
    sectionSelect.innerHTML = '';
    problemManager.sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section;
      option.textContent = section;
      sectionSelect.appendChild(option);
    });
    updateProblemSelect();
  }

  // 問題選択肢の更新
  function updateProblemSelect() {
    const selectedSection = sectionSelect.value;
    const sectionProblems = problemManager.getProblemsInSection(selectedSection);

    problemSelect.innerHTML = '';
    sectionProblems.forEach(problem => {
      const option = document.createElement('option');
      option.value = problem.id;
      option.textContent = problem.title;
      problemSelect.appendChild(option);
    });

    loadSelectedProblem();
  }

  // 選択された問題の読み込み
  function loadSelectedProblem() {
    const selectedSection = sectionSelect.value;
    const selectedProblemId = problemSelect.value;

    const problem = problemManager.setCurrentProblem(selectedSection, selectedProblemId);

    if (problem) {
      descriptionText.textContent = problem.description;
      detailedDescriptionText.textContent = problem.detailedDescription || '';
      codeEditor.value = problem.problemCode;
      rubyRunner.setTestCode(problem.testCode);
    }
  }

  // 問題のリセット
  function resetProblem() {
    if (problemManager.currentProblem) {
      codeEditor.value = problemManager.currentProblem.problemCode;
      testResult.textContent = '';
      testResult.className = '';
    }
  }

  // 初期化を開始
  rubyRunner.initialize().catch(error => {
    testResult.textContent = `初期化エラー: ${error.message}`;
    testResult.classList.add('failure');
  });

  // セクション選択の変更イベント
  sectionSelect.addEventListener('change', updateProblemSelect);

  // 問題選択の変更イベント
  problemSelect.addEventListener('change', loadSelectedProblem);

  // リセットボタンのクリックイベント
  resetButton.addEventListener('click', resetProblem);

  // 実行ボタンのクリックイベント
  runButton.addEventListener('click', async () => {
    // UIの更新
    runButton.disabled = true;
    resetButton.disabled = true;
    loading.classList.remove('hidden');
    testResult.textContent = '';
    testResult.className = '';

    try {
      // テスト実行前にRuby VMをリセット
      await rubyRunner.resetVM();
      rubyRunner.setTestCode(problemManager.currentProblem.testCode);
      
      const userCode = codeEditor.value;
      // テストの実行（問題IDを渡して実行順序を決定）
      const result = await rubyRunner.runTest(userCode, problemManager.currentProblem.id);
      console.log(result);
      // 結果の表示
      testResult.textContent = result.output.join("\n");

      if (result.success) {
        testResult.classList.add('success');
      } else {
        testResult.classList.add('failure');
      }
    } catch (error) {
      testResult.textContent = `実行エラー: ${error.message}`;
      testResult.classList.add('failure');
    } finally {
      // UIの復元
      runButton.disabled = false;
      resetButton.disabled = false;
      loading.classList.add('hidden');
    }
  });

  // 初期化
  initSectionSelect();
});
