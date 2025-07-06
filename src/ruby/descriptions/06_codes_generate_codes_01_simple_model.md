# 日本語

次の仕様を満たす、SimpleModelモジュールを作成してください

1. include されたクラスがattr_accessorを使用すると、以下の追加動作を行う
  1. 作成したアクセサのreaderメソッドは、通常通りの動作を行う
  2. 作成したアクセサのwriterメソッドは、通常に加え以下の動作を行う
    1. 何らかの方法で、writerメソッドを利用した値の書き込み履歴を記憶する
    2. いずれかのwriterメソッド経由で更新をした履歴がある場合、 `true` を返すメソッド `changed?` を作成する
    3. 個別のwriterメソッド経由で更新した履歴を取得できるメソッド、 `ATTR_changed?` を作成する
      1. 例として、`attr_accessor :name, :desc`　とした時、このオブジェクトに対して `obj.name = 'hoge'` という操作を行ったとする
      2. `obj.name_changed?` は `true` を返すが、 `obj.desc_changed?` は `false` を返す
      3. 参考として、この時 `obj.changed?` は `true` を返す
2. initializeメソッドはハッシュを受け取り、attr_accessorで作成したアトリビュートと同名のキーがあれば、自動でインスタンス変数に記録する
  1. ただし、この動作をwriterメソッドの履歴に残してはいけない
3. 履歴がある場合、すべての操作履歴を放棄し、値も初期状態に戻す `restore!` メソッドを作成する

# English

Create a SimpleModel module that meets the following specifications

1. When an included class uses attr_accessor, it performs the following additional actions
  1. The created accessor's reader method performs normal operations
  2. The created accessor's writer method performs the following in addition to normal operations
    1. By some method, remember the history of value writes using the writer method
    2. If there is a history of updates via any writer method, create a method `changed?` that returns `true`
    3. Create a method `ATTR_changed?` that can retrieve the history of updates via individual writer methods
      1. As an example, when `attr_accessor :name, :desc` is used, suppose the operation `obj.name = 'hoge'` is performed on this object
      2. `obj.name_changed?` returns `true`, but `obj.desc_changed?` returns `false`
      3. For reference, `obj.changed?` returns `true` at this time
2. The initialize method receives a hash and automatically records it in instance variables if there are keys with the same name as attributes created by attr_accessor
  1. However, this action must not be recorded in the writer method history
3. If there is history, create a `restore!` method that discards all operation history and returns values to their initial state
