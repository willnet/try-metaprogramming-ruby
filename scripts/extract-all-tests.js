// 全てのテストコードをRubyファイルとして抽出するスクリプト
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パス設定
const problemsDir = path.join(__dirname, '../src/problems');
const testsDir = path.join(__dirname, '../src/ruby/tests');

// testsディレクトリの確認・作成
if (!fs.existsSync(testsDir)) {
  fs.mkdirSync(testsDir, { recursive: true });
}

// 統計情報
let extractedTests = 0;
let skippedTests = 0;

// 問題ファイルを取得
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${problemFiles.length} problem files to process...`);

for (const filename of problemFiles) {
  const filepath = path.join(problemsDir, filename);
  const baseName = filename.replace('.js', '');
  const testFilePath = path.join(testsDir, `${baseName}.rb`);
  
  try {
    // 動的インポートを使用してES6モジュールを読み込み
    const { problem } = await import(`file://${filepath}`);
    
    console.log(`\nProcessing: ${filename}`);
    console.log(`  Title: ${problem.title || 'No title'}`);
    
    // testCode を抽出
    if (problem.testCode && problem.testCode.trim()) {
      // 既存のテストファイルがある場合はスキップ
      if (fs.existsSync(testFilePath)) {
        console.log(`  - Test file already exists, skipping: ${baseName}.rb`);
        skippedTests++;
      } else {
        fs.writeFileSync(testFilePath, problem.testCode);
        console.log(`  ✓ Extracted testCode -> ${baseName}.rb`);
        extractedTests++;
      }
    } else {
      console.log(`  - No testCode found`);
      skippedTests++;
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

// 結果レポート
console.log('\n' + '='.repeat(50));
console.log('TEST EXTRACTION COMPLETE');
console.log('='.repeat(50));
console.log(`Problem files processed: ${problemFiles.length}`);
console.log(`Tests extracted: ${extractedTests}`);
console.log(`Tests skipped (already exist or no content): ${skippedTests}`);
console.log(`\nTest files location: ${testsDir}`);