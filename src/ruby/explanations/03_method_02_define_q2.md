# 日本語

define_singleton_methodを利用して動的に特異メソッドを定義することで、条件2を満たしています。

define_methodはModuleのインスタンスメソッドなので、initializeメソッド中では使えません。A2.define_methodのようにすれば使えますが、それだとA2クラスのインスタンスメソッドになるのですべてのA2インスタンスで利用できてしまい、「メソッドが定義されるのは同時に生成されるオブジェクトのみで、別のA2インスタンスには（同じ値を含む配列を生成時に渡さない限り）定義されない」という仕様を満たすことができません。

# English

By using `define_singleton_method` to dynamically define singleton methods, this solution satisfies condition 2.

`define_method` is an instance method of Module, so it cannot be used within the initialize method. While you could use `A2.define_method`, this would create instance methods on the A2 class that would be available to all A2 instances. This would violate the requirement that "methods are defined only for the instance being created, and are not defined for other A2 instances (unless the same array values are passed during creation)."