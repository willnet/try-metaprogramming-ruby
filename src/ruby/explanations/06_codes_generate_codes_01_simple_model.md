# 日本語

問題の解説

includeされたクラスのattr_accessorメソッドの挙動を変更するために、まずincludedフックメソッドを利用します。

初期値を管理する`_histories`と`_initial`属性をattr_accessorで用意しておきます。
historiesやinitialといった名前はクラスのメソッド定義などと衝突する可能性が高いので、`_`を先頭につけて回避するようにしています。
`_histories`は、writerメソッドを呼び出した時に、その値を記憶するためのハッシュです。キーは属性名、値はその属性に対する書き込み履歴の配列です。
`_initial`は、初期値を記憶するためのハッシュです。キーは属性名、値はその属性の初期値です。

includedの中で対象のクラスをextendして、クラスメソッドであるattr_accessorメソッドを再定義します。
readerメソッドは通常通りの動作を行う、と仕様にあるのでattr_readerを呼び出しています。
writerメソッドは、通常に加え以下の動作を行うと仕様にあるので、独自に定義します。writerメソッドの中で、`_histories`に書き込み履歴を追記させています。
そのうえで、instance_variable_setで属性の値を書き換えています。

initializeメソッドを定義し、`_initial`と`_histories`の初期化と`_initial`への初期値の記憶を行っています。
残りの`restore`, `changed?`, `ATTR_changed?`メソッドは、`_initial`と`_histories`を活用することで問題なく実装できるはずです。

# English

Problem Explanation

To change the behavior of the attr_accessor method of the included class, we first use the included hook method.

We prepare `_histories` and `_initial` attributes with attr_accessor to manage initial values.
Names like histories and initial are likely to conflict with class method definitions, so we avoid this by prefixing with `_`.
`_histories` is a hash to remember values when the writer method is called. The key is the attribute name, and the value is an array of write history for that attribute.
`_initial` is a hash to remember initial values. The key is the attribute name, and the value is the initial value of that attribute.

Inside included, we extend the target class and redefine the attr_accessor class method.
The reader method performs normal operations as specified, so we call attr_reader.
The writer method performs additional operations as specified, so we define it independently. Inside the writer method, we append the write history to `_histories`.
Then we rewrite the attribute value with instance_variable_set.

We define the initialize method to initialize `_initial` and `_histories` and remember initial values in `_initial`.
The remaining `restore`, `changed?`, and `ATTR_changed?` methods should be implementable without problems by utilizing `_initial` and `_histories`.
