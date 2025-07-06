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
const rubyTestsDir = path.join(__dirname, '../src/ruby/tests');
const rubyDescriptionsDir = path.join(__dirname, '../src/ruby/descriptions');
const rubyExplanationsDir = path.join(__dirname, '../src/ruby/explanations');

// 統計情報
let updatedFiles = 0;
let skippedFiles = 0;
let errors = 0;

// Markdown ファイルから日本語と英語の内容を分離する関数
function parseMarkdownSections(content) {
  const sections = {
    japanese: '',
    english: ''
  };
  
  if (!content) return sections;
  
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];
  
  for (const line of lines) {
    if (line.trim() === '# 日本語') {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = 'japanese';
      currentContent = [];
    } else if (line.trim() === '# English') {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = 'english';
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }
  
  // Handle the last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }
  
  return sections;
}

// JavaScript問題ファイルを取得
const jsFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${jsFiles.length} JavaScript problem files to sync...`);

for (const jsFilename of jsFiles) {
  const baseName = jsFilename.replace('.js', '');
  const jsFilePath = path.join(problemsDir, jsFilename);
  const rubyProblemPath = path.join(rubyProblemsDir, `${baseName}.rb`);
  const rubyAnswerPath = path.join(rubyAnswersDir, `${baseName}.rb`);
  const rubyTestPath = path.join(rubyTestsDir, `${baseName}.rb`);
  const rubyDescriptionPath = path.join(rubyDescriptionsDir, `${baseName}.md`);
  const rubyExplanationPath = path.join(rubyExplanationsDir, `${baseName}.md`);
  
  try {
    console.log(`\nProcessing: ${jsFilename}`);
    
    // 対応するRubyファイルの存在確認
    const hasProblemFile = fs.existsSync(rubyProblemPath);
    const hasAnswerFile = fs.existsSync(rubyAnswerPath);
    const hasTestFile = fs.existsSync(rubyTestPath);
    const hasDescriptionFile = fs.existsSync(rubyDescriptionPath);
    const hasExplanationFile = fs.existsSync(rubyExplanationPath);
    
    if (!hasProblemFile && !hasAnswerFile && !hasTestFile && !hasDescriptionFile && !hasExplanationFile) {
      console.log(`  - No corresponding Ruby files found, skipping`);
      skippedFiles++;
      continue;
    }
    
    // 現在のJavaScriptファイルを動的インポート
    const { problem } = await import(`file://${jsFilePath}`);
    
    // Rubyファイルの内容を読み込み
    let newProblemCode = problem.problemCode || '';
    let newAnswerCode = problem.answerCode || '';
    let newTestCode = problem.testCode || '';
    let newDetailedDescription = problem.detailedDescription || '';
    let newDetailedDescriptionEn = problem.detailedDescription_en || '';
    let newAnswerExplanation = problem.answerExplanation || '';
    let newAnswerExplanationEn = problem.answerExplanation_en || '';
    
    if (hasProblemFile) {
      newProblemCode = fs.readFileSync(rubyProblemPath, 'utf-8');
      console.log(`  ✓ Read problemCode from ${baseName}.rb`);
    }
    
    if (hasAnswerFile) {
      newAnswerCode = fs.readFileSync(rubyAnswerPath, 'utf-8');
      console.log(`  ✓ Read answerCode from ${baseName}.rb`);
    }
    
    if (hasTestFile) {
      newTestCode = fs.readFileSync(rubyTestPath, 'utf-8');
      console.log(`  ✓ Read testCode from ${baseName}.rb`);
    }
    
    if (hasDescriptionFile) {
      const descriptionContent = fs.readFileSync(rubyDescriptionPath, 'utf-8');
      const descriptionSections = parseMarkdownSections(descriptionContent);
      newDetailedDescription = descriptionSections.japanese;
      newDetailedDescriptionEn = descriptionSections.english;
      console.log(`  ✓ Read detailedDescription from ${baseName}.md`);
    }
    
    if (hasExplanationFile) {
      const explanationContent = fs.readFileSync(rubyExplanationPath, 'utf-8');
      const explanationSections = parseMarkdownSections(explanationContent);
      newAnswerExplanation = explanationSections.japanese;
      newAnswerExplanationEn = explanationSections.english;
      console.log(`  ✓ Read answerExplanation from ${baseName}.md`);
    }
    
    // 変更があったかチェック
    const problemChanged = newProblemCode !== problem.problemCode;
    const answerChanged = newAnswerCode !== problem.answerCode;
    const testChanged = newTestCode !== problem.testCode;
    const descriptionChanged = newDetailedDescription !== problem.detailedDescription;
    const descriptionEnChanged = newDetailedDescriptionEn !== problem.detailedDescription_en;
    const explanationChanged = newAnswerExplanation !== problem.answerExplanation;
    const explanationEnChanged = newAnswerExplanationEn !== problem.answerExplanation_en;
    
    if (!problemChanged && !answerChanged && !testChanged && !descriptionChanged && !descriptionEnChanged && !explanationChanged && !explanationEnChanged) {
      console.log(`  - No changes detected, skipping`);
      skippedFiles++;
      continue;
    }
    
    // 新しい問題オブジェクトを作成
    const updatedProblem = {
      ...problem,
      problemCode: newProblemCode,
      answerCode: newAnswerCode,
      testCode: newTestCode,
      detailedDescription: newDetailedDescription,
      detailedDescription_en: newDetailedDescriptionEn,
      answerExplanation: newAnswerExplanation,
      answerExplanation_en: newAnswerExplanationEn
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
    if (testChanged) console.log(`    - testCode updated`);
    if (descriptionChanged) console.log(`    - detailedDescription updated`);
    if (descriptionEnChanged) console.log(`    - detailedDescription_en updated`);
    if (explanationChanged) console.log(`    - answerExplanation updated`);
    if (explanationEnChanged) console.log(`    - answerExplanation_en updated`);
    
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