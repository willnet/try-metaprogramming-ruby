# 日本語

Q2. 問題の解説

回答例ではObjectクラスにhogeメソッドを定義しました。仕様としてあげられているクラスはすべて
Objectクラスのサブクラスなので、Objectクラスのインスタンスメソッドとしてhogeを定義すると仕様を満たせます。
Objectクラスではなく、仕様としてあげられていた各クラス(String, Integer, Numeric, Class, Hash, TrueClass)
に対してそれぞれ個別にhogeメソッドを定義しても問題ありません。

# English

Q2. Problem Explanation

In the answer example, we defined the hoge method in the Object class. All the classes listed in the specification are subclasses of the Object class, so defining hoge as an instance method of Object class satisfies the specification.
Instead of the Object class, you could also define the hoge method individually for each of the classes listed in the specification (String, Integer, Numeric, Class, Hash, TrueClass).
