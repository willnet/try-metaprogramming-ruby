# 日本語

Module#remove_methodを利用するとメソッドを削除できます。これを使い、「boolean 以外が入っている場合には #{name}? メソッドが存在しないようにする」を実現します。なお、メソッドを削除するメソッドはremove_methodの他にundef_methodも存在します。こちらでもテストはパスします。remove_methodとundef_methodの違いが気になる方はドキュメントを読んでみてください。

# English

You can remove methods using `Module#remove_method`. This is used to implement the requirement that "#{name}? methods should not exist when non-boolean values are assigned". Note that there is another method for removing methods: `undef_method`. The tests will also pass with `undef_method`. If you're curious about the difference between `remove_method` and `undef_method`, please read the documentation.