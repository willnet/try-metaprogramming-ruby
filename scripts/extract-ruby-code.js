// Ruby コード抽出スクリプト
// problemCode と answerCode を個別の .rb ファイルとして抽出します
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パス設定
const problemsDir = path.join(__dirname, '../src/problems');
const outputProblemsDir = path.join(__dirname, '../src/ruby/problems');
const outputAnswersDir = path.join(__dirname, '../src/ruby/answers');

// 統計情報
let extractedProblems = 0;
let extractedAnswers = 0;
let skippedProblems = 0;
let skippedAnswers = 0;

// 問題ファイルを取得
const problemFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${problemFiles.length} problem files to process...`);

for (const filename of problemFiles) {
  const filepath = path.join(problemsDir, filename);
  const baseName = filename.replace('.js', '');
  
  try {
    // 動的インポートを使用してES6モジュールを読み込み
    const { problem } = await import(`file://${filepath}`);
    
    console.log(`\nProcessing: ${filename}`);
    console.log(`  Title: ${problem.title || 'No title'}`);
    
    // problemCode を抽出
    if (problem.problemCode && problem.problemCode.trim()) {
      const problemFilePath = path.join(outputProblemsDir, `${baseName}.rb`);
      fs.writeFileSync(problemFilePath, problem.problemCode);
      console.log(`  ✓ Extracted problemCode -> ${baseName}.rb`);
      extractedProblems++;
    } else {
      console.log(`  - Skipped problemCode (empty or missing)`);
      skippedProblems++;
    }
    
    // answerCode を抽出
    if (problem.answerCode && problem.answerCode.trim()) {
      const answerFilePath = path.join(outputAnswersDir, `${baseName}.rb`);
      fs.writeFileSync(answerFilePath, problem.answerCode);
      console.log(`  ✓ Extracted answerCode -> ${baseName}.rb`);
      extractedAnswers++;
    } else {
      console.log(`  - Skipped answerCode (empty or missing)`);
      skippedAnswers++;
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

// 結果レポート
console.log('\n' + '='.repeat(50));
console.log('EXTRACTION COMPLETE');
console.log('='.repeat(50));
console.log(`Problem files processed: ${problemFiles.length}`);
console.log(`Problems extracted: ${extractedProblems} (skipped: ${skippedProblems})`);
console.log(`Answers extracted: ${extractedAnswers} (skipped: ${skippedAnswers})`);
console.log(`\nFiles created in:`);
console.log(`  Problems: ${outputProblemsDir}`);
console.log(`  Answers: ${outputAnswersDir}`);