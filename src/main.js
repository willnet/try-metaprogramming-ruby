import { RubyVM } from "@ruby/wasm-wasi";
import { File, WASI, OpenFile, ConsoleStdout } from "@bjorn3/browser_wasi_shim";
import { problems } from "./problems.js";
import { LanguageManager } from "./i18n.js";

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
  const detailedDescriptionText = document.getElementById('detailed-description-text');
  const codeEditor = document.getElementById('code-editor');
  const runButton = document.getElementById('run-button');
  const resetButton = document.getElementById('reset-button');
  const showAnswerButton = document.getElementById('show-answer-button');
  const answerContainer = document.getElementById('answer-container');
  const answerExplanationText = document.getElementById('answer-explanation-text');
  const answerCodeText = document.getElementById('answer-code-text');
  const testResult = document.getElementById('test-result');
  const loading = document.getElementById('loading');
  const languageJaBtn = document.getElementById('language-ja-btn');
  const languageEnBtn = document.getElementById('language-en-btn');

  const rubyRunner = new RubyRunner();
  const problemManager = new ProblemManager(problems);
  const languageManager = new LanguageManager();

  // 多言語対応のUI更新
  function updateUI() {
    // data-i18n属性を持つ全ての要素を更新
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = languageManager.t(key);
    });

    // ページタイトルも更新
    document.title = languageManager.t('pageTitle');

    // 言語切り替えボタンの状態を更新
    const currentLang = languageManager.getCurrentLanguage();
    languageJaBtn.classList.toggle('active', currentLang === 'ja');
    languageEnBtn.classList.toggle('active', currentLang === 'en');

    // 現在選択中の問題内容を再表示
    if (problemManager.currentProblem) {
      updateProblemContent();
    }
  }

  // 問題内容のみを更新（言語切り替え時用）
  function updateProblemContent() {
    const problem = problemManager.currentProblem;
    if (!problem) return;

    // 現在の言語に応じてフィールドを取得
    const detailedDescriptionField = languageManager.getProblemField('detailedDescription');
    
    detailedDescriptionText.textContent = problem[detailedDescriptionField] || problem.detailedDescription || '';
    
    // 回答が表示されている場合は回答内容も更新
    if (!answerContainer.classList.contains('hidden')) {
      const answerExplanationField = languageManager.getProblemField('answerExplanation');
      
      if (problem[answerExplanationField] || problem.answerExplanation) {
        answerExplanationText.textContent = problem[answerExplanationField] || problem.answerExplanation;
      } else {
        answerExplanationText.textContent = languageManager.t('noExplanation');
      }
    }
  }

  // 言語切り替え
  function setLanguage(lang) {
    languageManager.setLanguage(lang);
  }

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
      // 現在の言語に応じてフィールドを取得
      const detailedDescriptionField = languageManager.getProblemField('detailedDescription');
      
      detailedDescriptionText.textContent = problem[detailedDescriptionField] || problem.detailedDescription || '';
      codeEditor.value = problem.problemCode;
      rubyRunner.setTestCode(problem.testCode);
      hideAnswer(); // 問題変更時は回答を非表示にする
    }
  }

  // 問題のリセット
  function resetProblem() {
    if (problemManager.currentProblem) {
      codeEditor.value = problemManager.currentProblem.problemCode;
      testResult.textContent = '';
      testResult.className = '';
      hideAnswer();
    }
  }

  // 回答の表示/非表示切り替え
  function toggleAnswer() {
    if (answerContainer.classList.contains('hidden')) {
      showAnswer();
    } else {
      hideAnswer();
    }
  }

  // 回答を表示
  function showAnswer() {
    if (!problemManager.currentProblem) return;

    // 確認ダイアログ
    const confirmed = confirm(languageManager.t('showAnswerConfirm'));
    if (!confirmed) return;

    const problem = problemManager.currentProblem;
    
    // 現在の言語に応じてフィールドを取得
    const answerExplanationField = languageManager.getProblemField('answerExplanation');
    
    // 解説を表示（answerExplanationがある場合）
    if (problem[answerExplanationField] || problem.answerExplanation) {
      answerExplanationText.textContent = problem[answerExplanationField] || problem.answerExplanation;
    } else {
      answerExplanationText.textContent = languageManager.t('noExplanation');
    }

    // 回答コードを表示
    if (problem.answerCode) {
      answerCodeText.textContent = problem.answerCode;
    } else {
      answerCodeText.textContent = languageManager.t('noAnswer');
    }

    answerContainer.classList.remove('hidden');
    showAnswerButton.textContent = languageManager.t('hideAnswer');
  }

  // 回答を非表示
  function hideAnswer() {
    answerContainer.classList.add('hidden');
    showAnswerButton.textContent = languageManager.t('showAnswer');
  }

  // 初期化を開始
  rubyRunner.initialize().catch(error => {
    testResult.textContent = `${languageManager.t('initError')} ${error.message}`;
    testResult.classList.add('failure');
  });

  // セクション選択の変更イベント
  sectionSelect.addEventListener('change', updateProblemSelect);

  // 問題選択の変更イベント
  problemSelect.addEventListener('change', loadSelectedProblem);

  // リセットボタンのクリックイベント
  resetButton.addEventListener('click', resetProblem);

  // 回答表示ボタンのクリックイベント
  showAnswerButton.addEventListener('click', toggleAnswer);

  // 言語切り替えボタンのクリックイベント
  languageJaBtn.addEventListener('click', () => setLanguage('ja'));
  languageEnBtn.addEventListener('click', () => setLanguage('en'));

  // 言語変更時のコールバック登録
  languageManager.onLanguageChange(updateUI);

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
      testResult.textContent = `${languageManager.t('executionError')} ${error.message}`;
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
  updateUI(); // 初期表示時に言語設定を適用
});
