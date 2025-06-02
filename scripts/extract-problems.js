#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 元のリポジトリのパス
const REPO_PATH = '/Users/willnet/ghq/github.com/kinoppyd/reading-metaprogramming-ruby';
// 出力先のファイルパス
const OUTPUT_PATH = path.join(__dirname, '../src/problems.js');

// セクションディレクトリの一覧
const SECTIONS = [
  '00_setup',
  '02_object_model',
  '03_method',
  '04_block',
  '05_class_definition',
  '06_codes_generate_codes'
];

// 問題ファイルから説明文を抽出する関数
function extractDescription(content) {
  // コメント行を抽出
  const lines = content.split('\n');
  const commentLines = [];

  for (const line of lines) {
    if (line.trim().startsWith('#')) {
      // '#' を削除して追加
      commentLines.push(line.trim().substring(1).trim());
    } else if (commentLines.length > 0 && !line.trim()) {
      // 空行はそのまま追加（コメントの後に空行がある場合）
      commentLines.push('');
    } else if (commentLines.length > 0) {
      // コメント以外の行が来たら終了
      break;
    }
  }

  // 説明文がない場合は空文字列を返す
  if (commentLines.length === 0) {
    return '';
  }

  return commentLines.join('\n').trim();
}

// テストコードを修正する関数（run_tests関数を追加し、requireを削除）
function modifyTestCode(content) {
  // requireを削除
  let modifiedContent = content
    .replace(/require ['"]test_helper['"]/g, '# require test_helper removed')
    .replace(/require ['"][^'"]+['"]/g, '# require removed');

  // すでにrun_tests関数が含まれているか確認
  if (modifiedContent.includes('def run_tests')) {
    return modifiedContent;
  }

  // run_tests関数を追加
  return modifiedContent + `

# 明示的にテストを実行するためのコード
def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end`;
}

// 問題データを作成する関数
async function createProblemData() {
  const problems = [];

  for (const section of SECTIONS) {
    const sectionPath = path.join(REPO_PATH, section);

    // セクションディレクトリが存在するか確認
    if (!fs.existsSync(sectionPath)) {
      console.warn(`セクション ${section} が見つかりません。スキップします。`);
      continue;
    }

    // 問題ファイルを取得
    const files = fs.readdirSync(sectionPath);
    const problemFiles = files.filter(file =>
      file.endsWith('.rb') &&
      !file.startsWith('test_') &&
      file !== 'Rakefile'
    );

    for (const problemFile of problemFiles) {
      const id = path.basename(problemFile, '.rb');
      const problemPath = path.join(sectionPath, problemFile);

      // テストファイル名を生成（先頭の数字とアンダースコアを除去）
      const testId = id.replace(/^\d+_/, '');
      const testPath = path.join(sectionPath, 'test', `test_${testId}.rb`);

      // テストファイルが存在するか確認
      if (!fs.existsSync(testPath)) {
        console.warn(`問題 ${id} のテストファイルが見つかりません。スキップします。`);
        continue;
      }

      // 問題ファイルとテストファイルの内容を読み込む
      const problemContent = fs.readFileSync(problemPath, 'utf8');
      const testContent = fs.readFileSync(testPath, 'utf8');

      // 説明文を抽出
      const description = extractDescription(problemContent);

      // タイトルを作成（IDをキャメルケースに変換）
      const title = id
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // テストコードを修正
      const modifiedTestContent = modifyTestCode(testContent);

      // 問題データを作成
      problems.push({
        section,
        id,
        title,
        description,
        problemCode: problemContent,
        testCode: modifiedTestContent
      });
    }
  }

  return problems;
}

// 既存のproblems.jsファイルを読み込む関数
function readExistingProblems() {
  try {
    // ファイルが存在するか確認
    if (!fs.existsSync(OUTPUT_PATH)) {
      console.warn(`${OUTPUT_PATH} が見つかりません。空の配列を返します。`);
      return [];
    }

    const content = fs.readFileSync(OUTPUT_PATH, 'utf8');

    // 既存の問題データを抽出
    const match = content.match(/export const problems = (\[[\s\S]*\]);/);
    if (!match) {
      console.warn('既存の問題データが見つかりません。空の配列を返します。');
      return [];
    }

    // 問題データをJavaScriptオブジェクトに変換
    // evalを使用する代わりに、Node.jsのモジュールシステムを利用
    const tempFilePath = path.join(__dirname, 'temp_problems.js');
    fs.writeFileSync(tempFilePath, `module.exports = ${match[1]};`);

    try {
      const problems = require(tempFilePath);
      fs.unlinkSync(tempFilePath); // 一時ファイルを削除
      return problems;
    } catch (error) {
      console.error('問題データの読み込みに失敗しました。', error);
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath); // エラー時も一時ファイルを削除
      }
      return [];
    }
  } catch (error) {
    console.error('既存の問題データの解析に失敗しました。', error);
    return [];
  }
}

// 問題データをファイルに書き込む関数
function writeProblemsToFile(problems) {
  // 問題データをJavaScript形式に変換
  const problemsJs = `// メタプログラミングRuby問題集のデータ
export const problems = ${JSON.stringify(problems, null, 2)};`;

  // ファイルに書き込む
  fs.writeFileSync(OUTPUT_PATH, problemsJs);

  console.log(`${problems.length}個の問題データを ${OUTPUT_PATH} に書き込みました。`);
}

// メイン関数
async function main() {
  try {
    // 問題データを作成
    const newProblems = await createProblemData();
    console.log(`${newProblems.length}個の問題データを抽出しました。`);

    // 既存の問題データを読み込む
    const existingProblems = readExistingProblems();
    console.log(`${existingProblems.length}個の既存問題データを読み込みました。`);

    // 問題データをマージ
    const mergedProblems = [...existingProblems, ...newProblems];

    // 問題データをファイルに書き込む
    writeProblemsToFile(mergedProblems);

    console.log('問題データの抽出が完了しました。');
  } catch (error) {
    console.error('問題データの抽出に失敗しました。', error);
    process.exit(1);
  }
}

// スクリプトを実行
main();
