# 日本語

書籍の3章にはまだ登場していない概念ですが、includedフックを利用してモジュールがincludeされたときの振る舞いを記述しています。`my_attr_accessor`メソッドはクラスメソッドに相当するため、`included`メソッドの引数として渡されてきたクラスに直接`define_singleton_method`でメソッドを追加しています。さらに`my_attr_accessor`メソッド実行時にインスタンスメソッドを追加するために`define_method`を利用しています。セッターで定義した値を格納するために`@my_attr_accessor`をハッシュとして定義して利用しています。`?`つきのメソッドを定義するために、セッター実行時にdefine_singleton_methodでメソッドを追加しています。

# English

Though this concept hasn't appeared in Chapter 3 of the book yet, this solution uses the `included` hook to describe behavior when the module is included. Since the `my_attr_accessor` method is equivalent to a class method, we add the method directly to the class passed as an argument to the `included` method using `define_singleton_method`. Furthermore, to add instance methods when `my_attr_accessor` is executed, we use `define_method`. To store values defined by the setter, we define and use `@my_attr_accessor` as a hash. To define methods with `?`, we add methods using `define_singleton_method` when the setter is executed.

