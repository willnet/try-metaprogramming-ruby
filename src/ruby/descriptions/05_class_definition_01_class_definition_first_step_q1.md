# 日本語

1. ExClassクラスのオブジェクトが2つあります。これらをJudgement.callに渡しています。
   使えるようにしてください。helloメソッドの中身は何でも良いです。
2. ExClassを継承したクラスを作成してください。ただし、そのクラスは定数がない無名のクラスだとします。
3. 下のMetaClassに対し、次のように`meta_`というプレフィックスが属性名に自動でつき、ゲッターの戻り値の文字列にも'meta 'が自動でつく
#    attr_accessorのようなメソッドであるmeta_attr_accessorを作ってください。セッターに文字列以外の引数がくることは考えないとします。
#
#    使用例:
#
#    class MetaClass
#      # meta_attr_accessor自体の定義は省略
#      meta_attr_accessor :hello
#    end
#    meta = MetaClass.new
#    meta.meta_hello = 'world'
#    meta.meta_hello #=> 'meta world'
# 4. 次のようなExConfigクラスを作成してください。ただし、グローバル変数、クラス変数は使わないものとします。
#    使用例:
#    ExConfig.config = 'hello'
#    ExConfig.config #=> 'hello'
#    ex = ExConfig.new
#    ex.config #=> 'hello'
#    ex.config = 'world'
#    ExConfig.config #=> 'world'
# 5.
# ExOver#helloというメソッドがライブラリとして定義されているとします。ExOver#helloメソッドを実行したとき、
# helloメソッドの前にExOver#before、helloメソッドの後にExOver#afterを実行させるようにExOverを変更しましょう。
#
# 6. 次の toplevellocal ローカル変数の中身を返す MyGreeting#say を実装してみてください。
#    ただし、下のMyGreetingは編集しないものとします。toplevellocal ローカル変数の定義の下の行から編集してください。

# English

1. There are two ExClass objects. These are passed to Judgement.call.
   Make them usable. The content of the hello method can be anything.
2. Create a class that inherits from ExClass. However, assume that the class is an anonymous class without constants.
3. For the MetaClass below, create a meta_attr_accessor method that automatically adds the prefix `meta_` to attribute names and 'meta ' to getter return value strings
   like attr_accessor. Assume that setter arguments other than strings will not be considered.

   Usage example:

   class MetaClass
     # Definition of meta_attr_accessor itself is omitted
     meta_attr_accessor :hello
   end
   meta = MetaClass.new
   meta.meta_hello = 'world'
   meta.meta_hello #=> 'meta world'
4. Create an ExConfig class as follows. However, do not use global variables or class variables.
   Usage example:
   ExConfig.config = 'hello'
   ExConfig.config #=> 'hello'
   ex = ExConfig.new
   ex.config #=> 'hello'
   ex.config = 'world'
   ExConfig.config #=> 'world'
5. Assume that a method called ExOver#hello is defined as a library. When executing the ExOver#hello method,
   modify ExOver to execute ExOver#before before the hello method and ExOver#after after the hello method.

6. Implement MyGreeting#say that returns the contents of the toplevellocal local variable below.
   However, do not edit the MyGreeting below. Edit from the line below the definition of the toplevellocal local variable.
