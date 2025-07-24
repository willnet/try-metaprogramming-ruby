# 日本語

この問題は、動的プロキシパターンの実装を学ぶものです。プロキシオブジェクトが別のオブジェクトのメソッド呼び出しを透過的に転送する仕組みを作ります。

実装のポイント：
1. `method_missing`で全ての引数（`...`）を受け取り、そのまま`@source`に転送
2. Ruby 2.7以降の`...`（三点リーダー）は、全ての引数（位置引数、キーワード引数、ブロック）を転送
3. `respond_to_missing?`も実装し、`@source`の`respond_to?`結果をそのまま返す

重要な違い（Q1との比較）：
- Q1では`respond_to_missing?`がなくてもテストは通りましたが、Q2では必須
- プロキシパターンでは、元のオブジェクトのメソッド存在確認も正確に転送する必要がある
- これにより、プロキシオブジェクトが完全に透過的に動作する

動的プロキシは、オブジェクトのメソッド呼び出しをインターセプトして、ロギング、キャッシング、遅延評価などの機能を追加する際に有用です。

# English

This challenge teaches implementing the dynamic proxy pattern, where a proxy object transparently forwards method calls to another object.

Key implementation points:
1. `method_missing` receives all arguments (`...`) and forwards them directly to `@source`
2. The `...` (three dots) in Ruby 2.7+ forwards all arguments (positional, keyword, and block)
3. Also implement `respond_to_missing?`, returning the result of `@source`'s `respond_to?`

Important difference (compared to Q1):
- In Q1, `respond_to_missing?` was optional for tests to pass, but in Q2 it's required
- In the proxy pattern, method existence checks from the original object must be accurately forwarded
- This ensures the proxy object operates completely transparently

Dynamic proxies are useful for intercepting method calls to add functionality like logging, caching, or lazy evaluation.