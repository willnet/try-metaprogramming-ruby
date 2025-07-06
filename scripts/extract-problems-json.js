#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 個別の問題ファイルから全ての問題データを読み込んでJSONファイルを生成
const problemsDir = path.join(__dirname, '../src/problems');
const outputPath = path.join(__dirname, '../test/problems.json');

// test ディレクトリが存在しない場合は作成
const testDir = path.join(__dirname, '../test');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

try {
  // src/problems ディレクトリ内の全ての .js ファイルを取得
  const files = fs.readdirSync(problemsDir)
    .filter(file => file.endsWith('.js'))
    .sort(); // ファイル名でソート

  const allProblems = [];

  for (const file of files) {
    const filePath = path.join(problemsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // export const problem = { ... } の形式から問題データを抽出
    // 複数行にまたがるオブジェクトを正しく抽出するための正規表現
    const match = content.match(/export const problem = ({[\s\S]*?});/);
    
    if (match) {
      try {
        // Function constructorを使って安全に評価
        const problemData = new Function('return ' + match[1])();
        allProblems.push(problemData);
        console.log(`✓ Loaded problem from ${file}`);
      } catch (error) {
        console.error(`✗ Error parsing ${file}:`, error.message);
      }
    } else {
      console.warn(`⚠ No problem data found in ${file}`);
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
  
  console.log(`\n✨ Generated ${outputPath}`);
  console.log(`📊 Total problems: ${allProblems.length}`);
  
  // セクションごとの統計を表示
  const sectionCounts = {};
  allProblems.forEach(problem => {
    sectionCounts[problem.section] = (sectionCounts[problem.section] || 0) + 1;
  });
  
  console.log('\n📁 Problems by section:');
  Object.entries(sectionCounts).forEach(([section, count]) => {
    console.log(`  - ${section}: ${count} problems`);
  });

} catch (error) {
  console.error('❌ Failed to generate problems.json:', error);
  process.exit(1);
}