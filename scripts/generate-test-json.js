#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 個別の問題ファイルから全ての問題データを読み込んでJSONファイルを生成
const problemsDir = path.join(__dirname, '../src/problems');
const outputPath = path.join(__dirname, '../test/problems.json');

let allProblems = [];

// src/problems 配下の全ての .js ファイルを取得
const files = fs.readdirSync(problemsDir).filter(file => file.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(problemsDir, file);
  
  try {
    // ESモジュールの内容を読み取り、問題データを抽出
    const content = fs.readFileSync(filePath, 'utf8');
    
    // export const problem = から問題オブジェクトを抽出
    const match = content.match(/export const problem = (\{[\s\S]*?\});/);
    if (match) {
      try {
        // JavaScriptのオブジェクトとして評価
        const problem = eval('(' + match[1] + ')');
        allProblems.push(problem);
        console.log(`Loaded problem from ${file}: ${problem.section}/${problem.id}`);
      } catch (error) {
        console.error(`Error parsing ${file}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
  }
}

// セクションとIDでソート
allProblems.sort((a, b) => {
  if (a.section !== b.section) {
    return a.section.localeCompare(b.section);
  }
  return a.id.localeCompare(b.id);
});

// JSONファイルとして出力
fs.writeFileSync(outputPath, JSON.stringify(allProblems, null, 2));
console.log(`Generated ${outputPath} with ${allProblems.length} problems`);