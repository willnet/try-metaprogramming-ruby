// 分割された問題を個別ファイルに出力するスクリプト
import fs from 'fs';
import path from 'path';
import { splitProblems } from '../src/split-problems.js';

// 問題ディレクトリのパス
const problemsDir = 'src/problems';

// 既存の問題ファイルを取得（削除用）
const existingFiles = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));
console.log('Existing files:', existingFiles);

// 各問題を個別ファイルに作成
const createdFiles = [];

for (const problem of splitProblems) {
  const filename = `${problem.section}_${problem.id}.js`;
  const filepath = path.join(problemsDir, filename);
  
  // ファイル内容を生成
  const fileContent = `// ${problem.title}
export const problem = ${JSON.stringify(problem, null, 2)};
`;

  // ファイルを作成
  fs.writeFileSync(filepath, fileContent);
  createdFiles.push(filename);
  console.log(`Created: ${filename}`);
}

console.log(`\nCreated ${createdFiles.length} individual problem files.`);
console.log('Files:', createdFiles);

// 新しいproblems.jsファイルの内容を生成
const importStatements = createdFiles.map(filename => {
  const moduleName = 'problem_' + filename.replace('.js', '').replace(/[^a-zA-Z0-9]/g, '_');
  return `import { problem as ${moduleName} } from './problems/${filename}';`;
}).join('\n');

const exportStatement = `export const problems = [\n  ${createdFiles.map(filename => {
  const moduleName = 'problem_' + filename.replace('.js', '').replace(/[^a-zA-Z0-9]/g, '_');
  return moduleName;
}).join(',\n  ')}\n];`;

const newProblemsContent = `// メタプログラミングRuby問題集のデータ統合ファイル（個別ファイル版）
${importStatements}

${exportStatement}
`;

// problems.jsファイルの新しい内容を出力（実際には上書きしない）
console.log('\n--- New problems.js content ---');
console.log(newProblemsContent);