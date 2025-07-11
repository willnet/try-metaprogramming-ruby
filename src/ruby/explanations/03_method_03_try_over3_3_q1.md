# 日本語

この問題は、Rubyの`method_missing`を使った「ゴーストメソッド」の実装を学ぶものです。

ゴーストメソッドとは：
- 実際には定義されていないが、呼び出すことができるメソッド
- `method_missing`で動的に処理される

実装のポイント：
1. `method_missing`メソッドで、呼び出されたメソッド名が`test_`で始まるかチェック
2. 該当する場合は`run_test`を実行、そうでなければ`super`で親クラスに委譲
3. `respond_to_missing?`も合わせて定義することで、`respond_to?`が正しく動作する

`respond_to_missing?`について：
- `method_missing`を定義する際は、セットで定義するのがベストプラクティス
- これにより、`obj.respond_to?(:test_foo)`が`true`を返すようになる
- メソッドの存在確認が正しく動作し、より一貫性のある振る舞いを実現

# English

This problem teaches implementing "ghost methods" using Ruby's `method_missing`.

What are ghost methods:
- Methods that aren't actually defined but can be called
- Dynamically handled by `method_missing`

Key implementation points:
1. In `method_missing`, check if the called method name starts with `test_`
2. If it does, execute `run_test`; otherwise, delegate to the parent class with `super`
3. Also define `respond_to_missing?` to make `respond_to?` work correctly

About `respond_to_missing?`:
- It's best practice to define it alongside `method_missing`
- This makes `obj.respond_to?(:test_foo)` return `true`
- Ensures method existence checks work correctly, achieving more consistent behavior