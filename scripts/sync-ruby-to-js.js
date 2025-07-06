// Ruby ファイルの変更を JavaScript 問題ファイルに同期するスクリプト
// src/ruby/ の変更を src/problems/ に反映します
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パス設定
const problemsDir = path.join(__dirname, '../src/problems');
const rubyProblemsDir = path.join(__dirname, '../src/ruby/problems');
const rubyAnswersDir = path.join(__dirname, '../src/ruby/answers');

// 統計情報
let updatedFiles = 0;
let skippedFiles = 0;
let errors = 0;

// JavaScript問題ファイルを取得
const jsFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${jsFiles.length} JavaScript problem files to sync...`);

for (const jsFilename of jsFiles) {
  const baseName = jsFilename.replace('.js', '');
  const jsFilePath = path.join(problemsDir, jsFilename);
  const rubyProblemPath = path.join(rubyProblemsDir, `${baseName}.rb`);
  const rubyAnswerPath = path.join(rubyAnswersDir, `${baseName}.rb`);
  
  try {
    console.log(`\nProcessing: ${jsFilename}`);
    
    // 対応するRubyファイルの存在確認
    const hasProblemFile = fs.existsSync(rubyProblemPath);
    const hasAnswerFile = fs.existsSync(rubyAnswerPath);
    
    if (!hasProblemFile && !hasAnswerFile) {
      console.log(`  - No corresponding Ruby files found, skipping`);
      skippedFiles++;
      continue;
    }
    
    // 現在のJavaScriptファイルを動的インポート
    const { problem } = await import(`file://${jsFilePath}`);
    
    // Rubyファイルの内容を読み込み
    let newProblemCode = problem.problemCode || '';
    let newAnswerCode = problem.answerCode || '';
    
    if (hasProblemFile) {
      newProblemCode = fs.readFileSync(rubyProblemPath, 'utf-8');
      console.log(`  ✓ Read problemCode from ${baseName}.rb`);
    }
    
    if (hasAnswerFile) {
      newAnswerCode = fs.readFileSync(rubyAnswerPath, 'utf-8');
      console.log(`  ✓ Read answerCode from ${baseName}.rb`);
    }
    
    // 変更があったかチェック
    const problemChanged = newProblemCode !== problem.problemCode;
    const answerChanged = newAnswerCode !== problem.answerCode;
    
    if (!problemChanged && !answerChanged) {
      console.log(`  - No changes detected, skipping`);
      skippedFiles++;
      continue;
    }
    
    // 新しい問題オブジェクトを作成
    const updatedProblem = {
      ...problem,
      problemCode: newProblemCode,
      answerCode: newAnswerCode
    };
    
    // JavaScriptファイルの新しい内容を生成
    const newFileContent = `// ${problem.title || 'Problem'}
export const problem = ${JSON.stringify(updatedProblem, null, 2)};
`;
    
    // ファイルを更新
    fs.writeFileSync(jsFilePath, newFileContent);
    
    console.log(`  ✓ Updated JavaScript file:`);
    if (problemChanged) console.log(`    - problemCode updated`);
    if (answerChanged) console.log(`    - answerCode updated`);
    
    updatedFiles++;
    
  } catch (error) {
    console.error(`  ✗ Error processing ${jsFilename}:`, error.message);
    errors++;
  }
}

// 結果レポート
console.log('\n' + '='.repeat(50));
console.log('SYNC COMPLETE');
console.log('='.repeat(50));
console.log(`JavaScript files processed: ${jsFiles.length}`);
console.log(`Files updated: ${updatedFiles}`);
console.log(`Files skipped (no changes): ${skippedFiles}`);
console.log(`Errors: ${errors}`);

if (updatedFiles > 0) {
  console.log(`\n✓ ${updatedFiles} files have been updated with Ruby code changes.`);
  console.log(`You may need to rebuild the application to see the changes.`);
} else {
  console.log(`\nNo files needed updating.`);
}