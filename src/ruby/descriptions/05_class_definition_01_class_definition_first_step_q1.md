# 日本語

1. ExClassクラスのオブジェクトが2つあります。これらをJudgement.callに渡しています。Judement.callはテスト側で定義するので実装は不要です。この状況でe2オブジェクト"だけ"helloメソッドを使えるようにしてください。helloメソッドの中身は何でも良いです。
2. ExClassを継承したクラスを作成してください。ただし、そのクラスは定数がない無名のクラスだとします。その無名クラスをそのままJudgement2.call の引数として渡してください(Judgement2.callはテスト側で定義するので実装は不要です)
3. 下のMetaClassに対し、次のように`meta_`というプレフィックスが属性名に自動でつき、ゲッターの戻り値の文字列にも'meta 'が自動でつくattr_accessorのようなメソッドであるmeta_attr_accessorを作ってください。セッターに文字列以外の引数がくることは考えないとします。

使用例:

```
class MetaClass
  # meta_attr_accessor自体の定義は省略
  meta_attr_accessor :hello
end
meta = MetaClass.new
meta.meta_hello = 'world'
meta.meta_hello #=> 'meta world'
```

4. 次のようなExConfigクラスを作成してください。ただし、グローバル変数、クラス変数は使わないものとします。

使用例:

```
ExConfig.config = 'hello'
ExConfig.config #=> 'hello'
ex = ExConfig.new
ex.config #=> 'hello'
ex.config = 'world'
ExConfig.config #=> 'world'
```

5. ExOver#helloというメソッドがライブラリとして定義されているとします。ExOver#helloメソッドを実行したとき、helloメソッドの前にExOver#before、helloメソッドの後にExOver#afterを実行させるようにExOverを変更しましょう。ただしExOver#hello, ExOver#before, ExOver#afterの実装はそれぞれテスト側で定義しているので実装不要(変更不可)です。

6. 次の toplevellocal ローカル変数の中身を返す MyGreeting#say を実装してみてください。ただし、下のMyGreetingは編集しないものとします。toplevellocal ローカル変数の定義の下の行から編集してください。ヒント: スコープゲートを乗り越える方法について書籍にありましたね

# English

1. There are two ExClass objects. These are passed to Judgement.call. Judgement.call is defined on the test side, so implementation is not required. In this situation, please make "only" the e2 object able to use the hello method. The content of the hello method can be anything.
2. Create a class that inherits from ExClass. However, assume that the class is an anonymous class without constants. Pass that anonymous class directly as an argument to Judgement2.call (Judgement2.call is defined on the test side, so implementation is not required).
3. For the MetaClass below, create a meta_attr_accessor method that automatically adds the prefix `meta_` to attribute names and 'meta ' to getter return value strings like attr_accessor. Assume that setter arguments other than strings will not be considered.

Usage example:

```
class MetaClass
  # Definition of meta_attr_accessor itself is omitted
  meta_attr_accessor :hello
end
meta = MetaClass.new
meta.meta_hello = 'world'
meta.meta_hello #=> 'meta world'
```

4. Create an ExConfig class as follows. However, do not use global variables or class variables.

Usage example:

```
ExConfig.config = 'hello'
ExConfig.config #=> 'hello'
ex = ExConfig.new
ex.config #=> 'hello'
ex.config = 'world'
ExConfig.config #=> 'world'
```

5. Assume that a method called ExOver#hello is defined as a library. When executing the ExOver#hello method, modify ExOver to execute ExOver#before before the hello method and ExOver#after after the hello method. However, the implementations of ExOver#hello, ExOver#before, and ExOver#after are each defined on the test side, so implementation is not required (cannot be changed).

6. Implement MyGreeting#say that returns the contents of the toplevellocal local variable below. However, do not edit the MyGreeting below. Edit from the line below the definition of the toplevellocal local variable. Hint: There was information in the book about how to overcome scope gates.
