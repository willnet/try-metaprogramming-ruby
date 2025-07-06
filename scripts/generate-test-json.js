#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 分割された問題ファイルから全ての問題データを読み込んでJSONファイルを生成
const problemsDir = path.join(__dirname, '../src/problems');
const outputPath = path.join(__dirname, '../test/problems.json');

const sections = [
  '00_setup',
  '02_object_model', 
  '03_method',
  '04_block',
  '05_class_definition',
  '06_codes_generate_codes'
];

let allProblems = [];

for (const section of sections) {
  const filePath = path.join(problemsDir, `${section}.js`);
  if (fs.existsSync(filePath)) {
    // ESモジュールの内容を読み取り、問題データを抽出
    const content = fs.readFileSync(filePath, 'utf8');
    
    // export const から問題配列を抽出
    const match = content.match(/export const \w+Problems = (\[[\s\S]*?\]);/);
    if (match) {
      try {
        // JavaScriptの配列として評価
        const problems = eval(match[1]);
        allProblems = allProblems.concat(problems);
        console.log(`Loaded ${problems.length} problems from ${section}.js`);
      } catch (error) {
        console.error(`Error parsing ${section}.js:`, error);
      }
    }
  }
}

// JSONファイルとして出力
fs.writeFileSync(outputPath, JSON.stringify(allProblems, null, 2));
console.log(`Generated ${outputPath} with ${allProblems.length} problems`);