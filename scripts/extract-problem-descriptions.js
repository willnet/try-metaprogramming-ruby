// 問題説明をproblemCodeから抽出するスクリプト
import fs from 'fs';
import path from 'path';

const problemsDir = 'src/problems';

// problemCodeからコメント部分と実際のコード部分を分離する関数
function extractDescriptionAndCode(problemCode, filename) {
  const lines = problemCode.split('\n');
  const result = {
    detailedDescription: '',
    cleanProblemCode: '',
    extractedComments: [],
    remainingCode: []
  };

  // 実装指示ではないコメント（問題仕様）を識別する関数
  function isProblemSpecComment(line) {
    const trimmed = line.trim();
    
    // コメント行でない場合は false
    if (!trimmed.startsWith('#')) return false;
    
    // 空のコメント行は問題仕様の一部として扱う
    if (trimmed === '#') return true;
    
    // 実装ガイドライン系は除外
    if (trimmed.includes('NOTE:') || 
        trimmed.includes('これより上の行は変更しないこと') ||
        trimmed.includes('変更しないこと') ||
        trimmed.includes('テスト') ||
        trimmed.includes('ヒント:')) {
      return false;
    }
    
    // 問題仕様として扱うコメント
    return true;
  }

  let inCodeSection = false;
  let extractingComments = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 空行の処理
    if (trimmed === '') {
      if (extractingComments) {
        result.extractedComments.push(line);
      } else {
        result.remainingCode.push(line);
      }
      continue;
    }

    // コメント行の処理
    if (trimmed.startsWith('#')) {
      if (isProblemSpecComment(line)) {
        result.extractedComments.push(line);
      } else {
        // NOTEなどの実装ガイドラインは残す
        result.remainingCode.push(line);
        extractingComments = false;
        inCodeSection = true;
      }
    } else {
      // コード行
      result.remainingCode.push(line);
      extractingComments = false;
      inCodeSection = true;
    }
  }

  // 結果を構築
  result.detailedDescription = result.extractedComments.join('\n').trim();
  result.cleanProblemCode = result.remainingCode.join('\n').trim();

  return result;
}

// 問題ファイルを更新する関数
function updateProblemFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 現在のproblem objectを抽出
    const problemMatch = content.match(/export const problem = \{([\s\S]*?)\};/);
    if (!problemMatch) {
      console.warn(`Could not find problem object in ${filePath}`);
      return false;
    }

    // problemCodeを抽出
    const problemCodeMatch = content.match(/"problemCode": `([\s\S]*?)`,/);
    if (!problemCodeMatch) {
      console.warn(`Could not find problemCode in ${filePath}`);
      return false;
    }

    const originalProblemCode = problemCodeMatch[1];
    const extraction = extractDescriptionAndCode(originalProblemCode, path.basename(filePath));

    // 新しいファイル内容を構築
    let newContent = content;

    // detailedDescriptionフィールドを追加（descriptionの後に）
    if (extraction.detailedDescription) {
      const descriptionMatch = newContent.match(/("description": "[^"]*",)/);
      if (descriptionMatch) {
        const replacement = descriptionMatch[1] + '\n  "detailedDescription": `' + extraction.detailedDescription + '`,';
        newContent = newContent.replace(descriptionMatch[1], replacement);
      }
    }

    // problemCodeを更新
    if (extraction.cleanProblemCode) {
      newContent = newContent.replace(
        /"problemCode": `[\s\S]*?`,/,
        `"problemCode": \`${extraction.cleanProblemCode}\`,`
      );
    } else {
      // コードがない場合は空文字列
      newContent = newContent.replace(
        /"problemCode": `[\s\S]*?`,/,
        `"problemCode": \`\`,`
      );
    }

    // ファイルに書き戻し
    fs.writeFileSync(filePath, newContent);

    return {
      success: true,
      detailedDescriptionLines: extraction.detailedDescription.split('\n').length,
      cleanCodeLines: extraction.cleanProblemCode.split('\n').length,
      extracted: extraction
    };

  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

// メイン処理
async function main() {
  console.log('Extracting problem descriptions from problemCode...\n');

  const files = fs.readdirSync(problemsDir)
    .filter(file => file.endsWith('.js') && !file.includes('problems.js'))
    .sort();

  let successCount = 0;
  let failCount = 0;
  let totalExtractedLines = 0;
  let totalRemainingLines = 0;

  for (const filename of files) {
    const filePath = path.join(problemsDir, filename);
    console.log(`Processing: ${filename}`);

    const result = updateProblemFile(filePath);
    
    if (result && result.success) {
      successCount++;
      totalExtractedLines += result.detailedDescriptionLines;
      totalRemainingLines += result.cleanCodeLines;
      
      console.log(`  ✅ Extracted ${result.detailedDescriptionLines} description lines`);
      console.log(`  📝 Remaining ${result.cleanCodeLines} code lines`);
      
      // サンプル表示（最初の行のみ）
      if (result.extracted.detailedDescription) {
        const firstLine = result.extracted.detailedDescription.split('\n')[0];
        console.log(`  📖 "${firstLine}"`);
      }
      
    } else {
      failCount++;
      console.log(`  ❌ Failed to process`);
    }
    
    console.log('');
  }

  console.log('\n📊 Extraction Summary:');
  console.log(`✅ Successfully processed: ${successCount} files`);
  console.log(`❌ Failed: ${failCount} files`);
  console.log(`📖 Total extracted description lines: ${totalExtractedLines}`);
  console.log(`📝 Total remaining code lines: ${totalRemainingLines}`);
  
  if (successCount > 0) {
    const extractionRatio = (totalExtractedLines / (totalExtractedLines + totalRemainingLines) * 100).toFixed(1);
    console.log(`📊 Description extraction ratio: ${extractionRatio}%`);
  }
}

// スクリプト実行
main().catch(console.error);