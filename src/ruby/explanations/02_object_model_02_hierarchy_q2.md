# 日本語

この問題では、`prepend`の動作を理解することが重要です。

`prepend`は`include`とは異なり、モジュールをクラスの継承チェーンの**前**に挿入します。つまり、`prepend M1`を使用すると、継承チェーンは[M1, C2, ...]となります。

この結果、C2クラスで`name`メソッドを定義しても、M1モジュールの`name`メソッドが優先されるため、`C2.new.name`は'M1'を返します。これは、メソッド探索が継承チェーンの先頭から行われるためです。

# English

Understanding how `prepend` works is crucial for this problem.

Unlike `include`, `prepend` inserts the module **before** the class in the inheritance chain. When using `prepend M1`, the inheritance chain becomes [M1, C2, ...].

As a result, even though we define a `name` method in the C2 class, the `name` method from the M1 module takes precedence, so `C2.new.name` returns 'M1'. This is because method lookup starts from the beginning of the inheritance chain.