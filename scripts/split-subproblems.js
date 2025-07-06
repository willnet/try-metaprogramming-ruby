// 問題のサブ問題分割スクリプト
import fs from 'fs';
import path from 'path';
import { problems } from '../src/problems.js';

class ProblemSplitter {
  constructor() {
    this.splitProblems = [];
  }

  // 問題コードをQ1, Q2などで分割
  splitProblemCode(problemCode) {
    const sections = [];
    const lines = problemCode.split('\n');
    let currentSection = null;
    let currentLines = [];
    let sharedPrefix = [];

    // 共通部分（モジュール定義など）を抽出
    let foundFirstQ = false;
    for (const line of lines) {
      const qMatch = line.match(/^# Q(\d+)\.?$/);
      if (qMatch && !foundFirstQ) {
        foundFirstQ = true;
        // Q1が見つかるまでの行は共通部分
        sharedPrefix = [...currentLines];
        currentSection = parseInt(qMatch[1]);
        currentLines = [line];
      } else if (qMatch) {
        // 前のセクションを保存
        if (currentSection !== null) {
          sections.push({
            qNumber: currentSection,
            content: currentLines.join('\n').trim()
          });
        }
        // 新しいセクション開始
        currentSection = parseInt(qMatch[1]);
        currentLines = [line];
      } else {
        currentLines.push(line);
      }
    }

    // 最後のセクションを保存
    if (currentSection !== null) {
      sections.push({
        qNumber: currentSection,
        content: currentLines.join('\n').trim()
      });
    }

    // Q番号がない場合は全体を1つのセクションとして扱う
    if (sections.length === 0) {
      sections.push({
        qNumber: 1,
        content: problemCode.trim()
      });
    } else {
      // 各セクションに共通部分を前置
      sections.forEach(section => {
        if (sharedPrefix.length > 0) {
          section.content = sharedPrefix.join('\n').trim() + '\n\n' + section.content;
        }
      });
    }

    return sections;
  }

  // 回答コードをQ1, Q2などで分割
  splitAnswerCode(answerCode) {
    const sections = [];
    const lines = answerCode.split('\n');
    let currentSection = null;
    let currentLines = [];
    let sharedPrefix = [];

    // 共通部分（モジュール定義など）を抽出
    let foundFirstQ = false;
    for (const line of lines) {
      const qMatch = line.match(/^# Q(\d+)\.? .*/);
      if (qMatch && !foundFirstQ) {
        foundFirstQ = true;
        // Q1が見つかるまでの行は共通部分
        sharedPrefix = [...currentLines];
        currentSection = parseInt(qMatch[1]);
        currentLines = [line];
      } else if (qMatch) {
        // 前のセクションを保存
        if (currentSection !== null) {
          sections.push({
            qNumber: currentSection,
            content: currentLines.join('\n').trim()
          });
        }
        // 新しいセクション開始
        currentSection = parseInt(qMatch[1]);
        currentLines = [line];
      } else {
        currentLines.push(line);
      }
    }

    // 最後のセクションを保存
    if (currentSection !== null) {
      sections.push({
        qNumber: currentSection,
        content: currentLines.join('\n').trim()
      });
    }

    // Q番号がない場合は全体を1つのセクションとして扱う
    if (sections.length === 0) {
      sections.push({
        qNumber: 1,
        content: answerCode.trim()
      });
    } else {
      // 各セクションに共通部分を前置
      sections.forEach(section => {
        if (sharedPrefix.length > 0) {
          section.content = sharedPrefix.join('\n').trim() + '\n\n' + section.content;
        }
      });
    }

    return sections;
  }

  // テストコードをテストメソッドで分割 - シンプルアプローチ
  splitTestCode(testCode, expectedQNumbers) {
    const testSections = [];
    const lines = testCode.split('\n');
    
    // 簡単で確実なテストメソッド抽出
    const testMethods = [];
    const testMethodRegex = /def (test_[a-zA-Z0-9_]+)[\s\S]*?(?=(?:def test_|def run_tests|$))/g;
    let match;
    
    while ((match = testMethodRegex.exec(testCode)) !== null) {
      const fullMethod = match[0].trim();
      const methodName = match[1];
      
      // メソッドの最後のendを適切に処理
      const methodLines = fullMethod.split('\n');
      let processedLines = [];
      let pendingEnds = 0;
      
      for (let i = 0; i < methodLines.length; i++) {
        const line = methodLines[i];
        const trimmedLine = line.trim();
        
        processedLines.push(line);
        
        // defやclassでネストレベルを増加
        if (trimmedLine.match(/^\s*(def|class|module|begin|if|unless|case|while|until|for)\s/)) {
          pendingEnds++;
        }
        // doブロックも考慮
        else if (trimmedLine.includes(' do') || trimmedLine.endsWith(' do')) {
          pendingEnds++;
        }
        // endでネストレベルを減少
        else if (trimmedLine === 'end') {
          pendingEnds--;
          // メソッドのendに到達したら終了
          if (pendingEnds === 0) {
            break;
          }
        }
      }
      
      testMethods.push({
        name: methodName,
        content: processedLines.join('\n')
      });
    }

    // テストメソッドをQ番号に割り当て - より正確な方法
    const usedTestIndices = new Set();
    
    for (const qNumber of expectedQNumbers) {
      const qIndex = qNumber - 1; // Q1 -> index 0, Q2 -> index 1, etc.
      let relatedTests = [];
      
      // 1. テスト名にC{qNumber}やq{qNumber}が含まれているものを探す
      const explicitTests = testMethods.filter((test, index) => {
        if (usedTestIndices.has(index)) return false;
        const testName = test.name.toLowerCase();
        const content = test.content.toLowerCase();
        return testName.includes(`c${qNumber}`) ||
               testName.includes(`_q${qNumber}`) ||
               content.includes(`c${qNumber}`) ||
               content.includes(`assert_equal [c${qNumber}`) ||
               content.includes(`assert_equal 'c${qNumber}'`) ||
               content.includes(`c${qNumber}.new`);
      });
      
      if (explicitTests.length > 0) {
        relatedTests = explicitTests;
        explicitTests.forEach((test) => {
          const index = testMethods.indexOf(test);
          usedTestIndices.add(index);
        });
      } else if (qIndex < testMethods.length && !usedTestIndices.has(qIndex)) {
        // 2. フォールバック: 順番で割り当て（まだ使われていないもの）
        relatedTests = [testMethods[qIndex]];
        usedTestIndices.add(qIndex);
      }

      if (relatedTests.length > 0) {
        testSections.push({
          qNumber: qNumber,
          content: relatedTests.map(t => t.content).join('\n\n')
        });
      }
    }

    // シンプルなテンプレートベースアプローチ
    const buildCompleteTestCode = (testMethodContent) => {
      // テストコードの前半部分（requireからテストクラス開始まで）を抽出
      const beforeTestClass = [];
      const afterTestClass = [];
      let testClassName = '';
      let foundTestClass = false;
      let foundRunTests = false;
      let skipNextEnd = false;
      
      const lines = testCode.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!foundTestClass) {
          // テストクラス開始前
          beforeTestClass.push(line);
          if (trimmedLine.includes('class ') && trimmedLine.includes('< Minitest::Test')) {
            testClassName = trimmedLine.match(/class (\w+)/)[1];
            foundTestClass = true;
          }
        } else if (trimmedLine.includes('def run_tests')) {
          // run_testsメソッド以降
          foundRunTests = true;
          afterTestClass.push('');
          afterTestClass.push(line);
        } else if (foundRunTests) {
          afterTestClass.push(line);
        }
        // テストクラス内のテストメソッドはスキップ
      }
      
      // 完全なテストコードを構築
      const result = [
        ...beforeTestClass,
        testMethodContent,
        'end',
        ...afterTestClass
      ];
      
      return result.join('\n');
    };
    
    // 各テストセクションに完全な構造を適用
    const completeTestSections = testSections.map(section => ({
      qNumber: section.qNumber,
      content: buildCompleteTestCode(section.content)
    }));

    return { testSections: completeTestSections, commonContent: '' };
  }

  // 単一の問題を分割
  splitProblem(problem) {
    const problemSections = this.splitProblemCode(problem.problemCode);
    const answerSections = this.splitAnswerCode(problem.answerCode);
    
    // Q番号のリストを取得
    const qNumbers = [...new Set([
      ...problemSections.map(s => s.qNumber),
      ...answerSections.map(s => s.qNumber)
    ])].sort();

    // サブ問題が1つだけの場合はそのまま返す
    if (qNumbers.length <= 1) {
      return [problem];
    }

    const { testSections, commonContent } = this.splitTestCode(problem.testCode, qNumbers);

    const subProblems = [];
    
    for (const qNumber of qNumbers) {
      const problemSection = problemSections.find(s => s.qNumber === qNumber);
      const answerSection = answerSections.find(s => s.qNumber === qNumber);
      const testSection = testSections.find(s => s.qNumber === qNumber);

      if (problemSection && answerSection) {
        let testCode = testSection ? testSection.content : problem.testCode;
        
        // 特別なケース: SimpleModelのような依存関係がある場合、answer codeから必要な定義を抽出
        if (problem.id === '01_simple_model' && testCode.includes('include SimpleModel')) {
          // answerCodeからSimpleModelモジュール定義を抽出
          const answerLines = answerSection.content.split('\n');
          const moduleDefinition = [];
          let inModuleDefinition = false;
          let moduleDepth = 0;
          
          for (const line of answerLines) {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('module SimpleModel')) {
              inModuleDefinition = true;
              moduleDepth = 1;
              moduleDefinition.push(line);
            } else if (inModuleDefinition) {
              moduleDefinition.push(line);
              
              if (trimmedLine.includes('module ') || trimmedLine.includes('class ')) {
                moduleDepth++;
              } else if (trimmedLine === 'end') {
                moduleDepth--;
                if (moduleDepth === 0) {
                  break;
                }
              }
            }
          }
          
          // SimpleModel定義をテストコードに前置
          if (moduleDefinition.length > 0) {
            const testLines = testCode.split('\n');
            const requireIndex = testLines.findIndex(line => line.includes("require 'minitest'"));
            if (requireIndex !== -1) {
              testLines.splice(requireIndex + 1, 0, '', ...moduleDefinition, '');
              testCode = testLines.join('\n');
            }
          }
        }

        const subProblem = {
          section: problem.section,
          id: `${problem.id}_q${qNumber}`,
          title: `${problem.title} Q${qNumber}`,
          description: `${problem.description} (Q${qNumber})`,
          problemCode: problemSection.content,
          answerCode: answerSection.content,
          testCode: testCode
        };
        subProblems.push(subProblem);
      }
    }

    return subProblems.length > 0 ? subProblems : [problem];
  }

  // すべての問題を分割
  splitAllProblems() {
    console.log('Starting problem splitting...');
    
    for (const problem of problems) {
      const subProblems = this.splitProblem(problem);
      this.splitProblems.push(...subProblems);
      
      if (subProblems.length > 1) {
        console.log(`Split ${problem.section}/${problem.id} into ${subProblems.length} sub-problems`);
      }
    }
    
    console.log(`Total problems: ${problems.length} → ${this.splitProblems.length}`);
    return this.splitProblems;
  }

  // 分割された問題をファイルに保存
  saveToFile(outputPath) {
    const content = `// 分割された問題データ
export const splitProblems = ${JSON.stringify(this.splitProblems, null, 2)};
`;
    fs.writeFileSync(outputPath, content);
    console.log(`Split problems saved to ${outputPath}`);
  }
}

// メイン実行
const splitter = new ProblemSplitter();
const splitProblems = splitter.splitAllProblems();
splitter.saveToFile('src/split-problems.js');

console.log('Problem splitting completed!');