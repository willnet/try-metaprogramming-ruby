# Test Directory

このディレクトリには、回答例の正当性を検証するためのテストスクリプトが含まれています。

## ファイル構成

- `test_answers_comprehensive.rb` - 包括的なテストスクリプト
- `test_results_comprehensive.json` - テスト結果の詳細（実行後に生成）

## 使用方法

### 全問題のテスト実行

```bash
# プロジェクトルートから
npm run test:answers

# または直接実行
ruby test/test_answers_comprehensive.rb
```

### 特定問題のテスト実行

```bash
ruby test/test_answers_comprehensive.rb SECTION_NAME PROBLEM_ID

# 例：
ruby test/test_answers_comprehensive.rb 02_object_model 01_hoge
ruby test/test_answers_comprehensive.rb 04_block 03_simple_bot
```

## テストの仕組み

1. **独立実行環境**: 各問題の回答例を一時的なRubyファイルで個別にテスト
2. **自動修正**: 回答例に含まれる不適切なコード（テスト実行コードなど）を自動除去
3. **Minitest統合**: 各問題のMinitestテストスイートを実行して検証
4. **詳細レポート**: 成功/失敗の詳細、修正適用状況、エラー内容を報告

## テスト結果の解釈

- ✅ **PASS**: 回答例がすべてのテストをパス
- ✅ **PASS (fixed)**: 自動修正を適用してテストをパス
- ❌ **FAIL**: テストが失敗（詳細はレポートを参照）

## 既知の制限事項

- `minitest-mock`が必要な問題は環境によっては失敗する可能性があります
- 一部の回答例にはテスト実行コードが含まれており、自動修正が適用されます
- 複雑なメタプログラミング問題は環境固有の依存関係を持つ場合があります

## 継続的改善

テスト結果は品質向上のために活用してください：

1. 失敗したテストの原因を分析
2. 回答例の修正または環境の改善
3. 新しい問題の追加時は必ずテストを実行
4. テストスクリプト自体の改善も歓迎します