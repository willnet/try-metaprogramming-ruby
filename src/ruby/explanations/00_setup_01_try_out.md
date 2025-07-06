# 日本語

ミドルネームが渡されないことがある、というのをどう扱うかがこの問題のポイントです。
`def initialize(first_name, middle_name = nil, last_name)`のようにメソッドを定義することで
簡潔に仕様を満たすことができます。
あとはスペースで各要素を区切るやり方としてArray#joinを使っているのもポイントです。
これ以外にも複数の解法があります。この回答通りになっていなくても問題ありません。

# English

Problem Explanation

The key point of this problem is how to handle cases where a middle name may not be provided.
You can concisely meet the specifications by defining the method like `def initialize(first_name, middle_name = nil, last_name)`.
Another point is using Array#join to separate each element with spaces.
There are multiple other solutions besides this. It's fine if your answer doesn't match this solution exactly.
