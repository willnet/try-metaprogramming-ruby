# 日本語

この問題では、クラスの継承チェーン（ancestors）を理解し、モジュールのインクルードを適切に使用する必要があります。

`include M1`を使用することで、M1モジュールがC1クラスの継承チェーンに挿入されます。継承チェーンの順序は、クラス自身が最初に来て、その次にインクルードされたモジュールが来ます。

C1クラスに`name`メソッドを定義することで、M1モジュールの同名メソッドをオーバーライドし、'C1'を返すようにしています。

# English

This challenge requires understanding the class inheritance chain (ancestors) and proper use of module inclusion.

By using `include M1`, the M1 module is inserted into C1 class's inheritance chain. The order of the inheritance chain places the class itself first, followed by included modules.

By defining a `name` method in the C1 class, we override the method of the same name from the M1 module, returning 'C1' instead.