// 問題ファイルを人間が読みやすい形式に変換するスクリプト
import fs from 'fs';
import path from 'path';

// 問題ディレクトリのパス
const problemsDir = 'src/problems';

// 文字列内のエスケープシーケンスを実際の改行などに変換する関数
function unescapeString(str) {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

// テンプレートリテラル内でエスケープが必要な文字を処理
function escapeForTemplateLiteral(str) {
  return str
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// JSONから文字列値を安全に抽出する関数
function extractJsonStringValue(content, fieldName) {
  // フィールドの開始位置を見つける
  const fieldPattern = `"${fieldName}":\\s*"`;
  const startMatch = content.match(new RegExp(fieldPattern));
  if (!startMatch) return null;
  
  const startIndex = content.indexOf(startMatch[0]) + startMatch[0].length;
  
  // 文字列の終わりを見つける（エスケープされた引用符を考慮）
  let endIndex = startIndex;
  let escaped = false;
  
  while (endIndex < content.length) {
    const char = content[endIndex];
    
    if (escaped) {
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
    } else if (char === '"') {
      // エスケープされていない引用符が見つかった
      break;
    }
    
    endIndex++;
  }
  
  if (endIndex >= content.length) return null;
  
  return {
    value: content.substring(startIndex, endIndex),
    startPos: content.indexOf(startMatch[0]),
    endPos: endIndex + 1
  };
}

// 問題ファイルを変換する関数
function convertProblemFile(filePath) {
  console.log(`Converting: ${path.basename(filePath)}`);
  
  try {
    // ファイルを読み込み
    let content = fs.readFileSync(filePath, 'utf8');
    
    // problemCode, answerCode, testCode の各フィールドを変換
    const fields = ['problemCode', 'answerCode', 'testCode'];
    
    // 後ろから前に向かって変換（インデックスが変わらないように）
    for (const field of fields.reverse()) {
      const extracted = extractJsonStringValue(content, field);
      
      if (extracted) {
        // エスケープされた文字列を復元
        const unescaped = unescapeString(extracted.value);
        // テンプレートリテラル用にエスケープ
        const escaped = escapeForTemplateLiteral(unescaped);
        
        // 元の文字列をテンプレートリテラルに置換
        const before = content.substring(0, extracted.startPos);
        const after = content.substring(extracted.endPos);
        const replacement = `"${field}": \`${escaped}\``;
        
        content = before + replacement + after;
      }
    }
    
    // ファイルに書き戻し
    fs.writeFileSync(filePath, content);
    return true;
    
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    return false;
  }
}

// メイン処理
function main() {
  console.log('Starting conversion to readable format...');
  
  // 問題ファイルを取得
  const files = fs.readdirSync(problemsDir)
    .filter(file => file.endsWith('.js') && !file.includes('problems.js'))
    .map(file => path.join(problemsDir, file));
  
  console.log(`Found ${files.length} problem files to convert`);
  
  let successCount = 0;
  let failCount = 0;
  
  // 各ファイルを変換
  for (const filePath of files) {
    if (convertProblemFile(filePath)) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\nConversion completed!`);
  console.log(`✅ Success: ${successCount} files`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} files`);
  }
  
  // 変換後のサンプルを表示
  if (files.length > 0) {
    console.log(`\nSample output from ${path.basename(files[0])}:`);
    try {
      const sampleContent = fs.readFileSync(files[0], 'utf8');
      const lines = sampleContent.split('\n');
      const problemCodeStart = lines.findIndex(line => line.includes('"problemCode":'));
      if (problemCodeStart !== -1) {
        console.log(lines.slice(problemCodeStart, problemCodeStart + 5).join('\n'));
        console.log('...');
      }
    } catch (error) {
      console.log('Could not display sample');
    }
  }
}

// スクリプト実行
main();