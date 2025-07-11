# 日本語

仕様の「邪悪な機能」をクロージャを使って実装することに気付けるかどうかを問う問題です。
initializeメソッドの中でdefine_singleton_methodを利用してsend_mailメソッドを定義することで、initializeメソッドのローカル変数として第2引数を扱います。こうすることで、
send_mailメソッドの中でしか参照できない変数ができあがります。

# English

This problem tests whether you can realize that the "evil function" in the specification can be implemented using closures.
By defining the send_mail method using define_singleton_method inside the initialize method,
the second argument is handled as a local variable of the initialize method. This creates
a variable that can only be referenced within the send_mail method.
