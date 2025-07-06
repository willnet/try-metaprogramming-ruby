# 日本語

次の動作をする F1 class を実装する

1. "def"キーワードを使わずにF1クラスにhelloインスタンスメソッドを定義すること
     戻り値は "hello" であること
2. "def"キーワードを使わずにF1クラスにworldクラスメソッドを定義すること
     戻り値は "world" であること
3. 定義していないメソッドを実行したときにエラーを発生させず、"NoMethodError"という文字列を返すこと
4. `F1.new.respond_to?(定義していないメソッド名)` を実行したときにtrueを返すこと

# English

Implement an F1 class that behaves as follows

1. Define a hello instance method in F1 class without using the "def" keyword
     The return value should be "hello"
2. Define a world class method in F1 class without using the "def" keyword
     The return value should be "world"
3. When executing an undefined method, do not raise an error but return the string "NoMethodError"
4. When executing `F1.new.respond_to?(undefined_method_name)`, return true
