import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:8001';
const ANSWERS_DIR = 'src/ruby/answers';

// 回答ファイルから問題情報を抽出
function parseAnswerFiles() {
  const answerFiles = fs.readdirSync(ANSWERS_DIR).filter(file => file.endsWith('.rb'));
  return answerFiles.map(file => {
    const basename = path.basename(file, '.rb');
    const parts = basename.split('_');
    
    // ファイル名パターンに基づいてセクションとIDを抽出
    let section, id;
    
    if (basename.startsWith('00_setup')) {
      section = '00_setup';
      id = parts.slice(2).join('_');
    } else if (basename.startsWith('02_object_model')) {
      section = '02_object_model';  
      id = parts.slice(3).join('_');
    } else if (basename.startsWith('03_method')) {
      section = '03_method';
      id = parts.slice(2).join('_');
    } else if (basename.startsWith('04_block')) {
      section = '04_block';
      id = parts.slice(2).join('_');
    } else if (basename.startsWith('05_class_definition')) {
      section = '05_class_definition';
      id = parts.slice(3).join('_');
    } else if (basename.startsWith('06_codes_generate_codes')) {
      section = '06_codes_generate_codes';
      id = parts.slice(4).join('_');
    } else {
      console.warn(`Unexpected filename format: ${file}`);
      return null;
    }
    
    const answerCode = fs.readFileSync(path.join(ANSWERS_DIR, file), 'utf-8');
    
    return {
      file,
      section,
      id,
      answerCode: answerCode.trim()
    };
  }).filter(Boolean);
}

test.describe('E2E Quiz Tests', () => {
  const quizzes = parseAnswerFiles();
  
  console.log('Found quizzes:', quizzes.map(q => `${q.section}/${q.id}`));
  
  test.beforeEach(async ({ page }) => {
    // ページを開いて初期化を待つ
    await page.goto(BASE_URL);
    await page.waitForSelector('#section-select', { timeout: 10000 });
    
    // Ruby.wasmの初期化を待つ（デバッグ付き）
    await page.evaluate(() => {
      console.log('Waiting for rubyRunner initialization...');
    });
    
    await page.waitForFunction(() => {
      const initialized = window.rubyRunner && window.rubyRunner.initialized;
      if (!initialized) {
        console.log('Still waiting... rubyRunner:', !!window.rubyRunner, 'initialized:', window.rubyRunner?.initialized);
      }
      return initialized;
    }, { timeout: 60000 });
  });

  for (const quiz of quizzes) {
    test(`Quiz: ${quiz.section}/${quiz.id}`, async ({ page }) => {
      console.log(`Testing quiz: ${quiz.section}/${quiz.id}`);
      
      try {
        // セクションを選択
        await page.selectOption('#section-select', quiz.section);
        await page.waitForTimeout(500); // セクション変更の反映を待つ
        
        // 問題オプションが読み込まれるまで待つ
        await page.waitForTimeout(500);
        
        // 問題を選択（value属性で直接選択）
        await page.selectOption('#problem-select', quiz.id);
        await page.waitForTimeout(1000); // 問題データの読み込みを待つ
        
        // コードエディタをクリアして回答コードを入力
        const codeEditor = page.locator('#code-editor');
        await codeEditor.click();
        await codeEditor.fill(''); // クリア
        await codeEditor.fill(quiz.answerCode);
        
        // テスト実行ボタンをクリック
        await page.click('#run-button');
        
        // テスト結果を待つ（より簡単な方法）
        await page.waitForTimeout(2000);
        
        await page.waitForFunction(() => {
          const testResult = document.querySelector('#test-result');
          const runButton = document.querySelector('#run-button');
          // テスト結果が表示され、ボタンが有効になっている
          return testResult && testResult.textContent.trim() !== '' && 
                 runButton && !runButton.disabled;
        }, { timeout: 30000 });
        
        // テスト結果を取得
        const testOutput = await page.locator('#test-result').textContent();
        
        // 成功判定：「0 failures, 0 errors」が含まれている場合は成功
        const hasFailure = testOutput.includes('Failure:') || testOutput.includes('Error:');
        const hasSuccess = testOutput.includes('0 failures, 0 errors') && !hasFailure;
        
        if (!hasSuccess) {
          console.error(`Test failed for ${quiz.section}/${quiz.id}:`);
          console.error(testOutput);
          
          // スクリーンショットを保存
          await page.screenshot({ 
            path: `test/screenshots/failed_${quiz.section}_${quiz.id}.png`,
            fullPage: true 
          });
        }
        
        expect(hasSuccess, `Quiz ${quiz.section}/${quiz.id} should pass. Output: ${testOutput}`).toBe(true);
        
      } catch (error) {
        console.error(`Error testing quiz ${quiz.section}/${quiz.id}:`, error);
        
        // エラー時のスクリーンショット
        await page.screenshot({ 
          path: `test/screenshots/error_${quiz.section}_${quiz.id}.png`,
          fullPage: true 
        });
        
        throw error;
      }
    });
  }
});