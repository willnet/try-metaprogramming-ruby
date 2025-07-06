# 日本語

問題の解説

respondクラスメソッドで定義したブロックを、askインスタンスメソッドからどうやって参照するか、というのが
この問題の難所です。クラスメソッドで定義したインスタンス変数はクラスインスタンス変数としてクラスそのものに
紐づくインスタンス変数になるので、インスタンスメソッドから参照するには、回答例のように
`self.class.instance_variable_get(インスタンス変数名)`のようにします。
クラス変数を利用するとクラスメソッド、インスタンスメソッドどちらからでも`@@respond`のようにアクセスできるので
一見便利ですが、意図せず別のクラスとクラス変数が共有される可能性があるため、推奨しません。

SimpleBotとそのサブクラスで利用イメージのように定義されたブロックは、settingsクラスメソッドにアクセスできます。
settingsクラスメソッドは、settingクラスメソッドで登録したキーと値をそれぞれメソッド名とその返り値に持つオブジェクトを返すと
仕様を満たせます。メソッドが定義できればどんなオブジェクトを返しても仕様を満たせるため、この回答例では
特異メソッドを定義したObjectインスタンスを返しています。必ずしもObjectインスタンスである必要はありません。

# English

Problem Explanation

The difficult part of this problem is how to reference the block defined by the respond class method from the ask instance method.
Instance variables defined in class methods become class instance variables tied to the class itself,
so to reference them from instance methods, you need to use `self.class.instance_variable_get(instance_variable_name)` as in the answer example.
Using class variables might seem convenient because you can access them as `@@respond` from both class methods and instance methods,
but this is not recommended because class variables might be unintentionally shared with other classes.

Blocks defined as in the usage example in SimpleBot and its subclasses can access the settings class method.
The settings class method satisfies the specification by returning an object that has keys and values registered by the setting class method
as method names and their return values respectively. Since the specification can be satisfied as long as methods can be defined,
this answer example returns an Object instance with singleton methods defined. It doesn't necessarily have to be an Object instance.
