# 日本語

問題の解説
まずmockメソッドの実装から考えます。「もとのオブジェクトの能力が失われてはいけない」という仕様から、引数として受け付けたオブジェクトに
SimpleMockをextendすることでモック化に必要なメソッドであるexpects, watch, called_timesを追加するようにします。

expectsメソッドを実行したとき、レシーバとなるオブジェクトにだけメソッドを追加したいのでdefine_singleton_methodを利用して動的にメソッドを追加します。
メソッドの内容は、次のようにexpectsメソッドに続けてwatchメソッドが実行されたときに備えて、
カウンター用のインスタンス変数`@counter`(キーがexpectsで指定されたメソッド名、値が実行回数のハッシュ)を用意して
watchが実行されていたら(つまり対応する`@counter`の値があれば)それをインクリメントするようにします。

```ruby
obj = Object.new
obj = SimpleMock(obj)
obj.expects(:hoge, true)
obj.watch(:hoge)
obj.hoge #=> true
````

また、watchを実行したときにexpects経由で定義したメソッドを上書きしないように、expectsしたメソッド名を`@expects`に配列として保存しておきます。
watchでは`@expects`を見て、すでにexpectsで定義済みであればメソッドを上書きしないようにします。
そうしないとwatchメソッドを実行したときに、モックメソッドの戻り値の情報が失われてしまいます。

次にnewメソッドの実装を考えます。仕様から、SimpleMockはモジュールであることを求められていますが、
同時にモジュールには存在しないnewメソッドを持つようにも求められています。
これを、クラスメソッドのnewを明示的に定義することで満たします。このとき何らかのオブジェクトをmockメソッドの引数にして、
戻り値を返すようにすれば要件は満たせますが、モック用のオブジェクトとしては余計なメソッドをなるべく持たない方が扱いやすいので、
Object.newをmockメソッドの引数にしています。

# English

Problem Explanation
First, let's consider the implementation of the mock method. From the specification that "the original object's capabilities must not be lost", we add the methods necessary for mocking (expects, watch, called_times) by extending SimpleMock to the object received as an argument.

When the expects method is executed, we want to add a method only to the receiver object, so we use define_singleton_method to dynamically add methods.
The method content prepares an instance variable `@counter` for the counter (a hash where the key is the method name specified by expects and the value is the execution count) in preparation for when the watch method is executed following the expects method,
and increments it if watch has been executed (i.e., if there is a corresponding `@counter` value).

```ruby
obj = Object.new
obj = SimpleMock(obj)
obj.expects(:hoge, true)
obj.watch(:hoge)
obj.hoge #=> true
```

Also, to avoid overwriting methods defined via expects when watch is executed, we save the method names from expects as an array in `@expects`.
In watch, we look at `@expects` and avoid overwriting methods if they are already defined by expects.
Otherwise, the return value information of the mock method would be lost when the watch method is executed.

Next, let's consider the implementation of the new method. From the specification, SimpleMock is required to be a module,
but at the same time it is also required to have a new method that doesn't exist in modules.
We satisfy this by explicitly defining the class method new. At this point, we can satisfy the requirements by passing some object as an argument to the mock method and returning the return value, but since it's easier to handle mock objects with as few extra methods as possible,
we use Object.new as the argument to the mock method.
