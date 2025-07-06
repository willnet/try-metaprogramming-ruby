# 日本語

Q4
以下のように実行できる TryOver3::A4 クラスを作成してください。
TryOver3::A4.runners = [:Hoge]
TryOver3::A4::Hoge.run
=> "run Hoge"
このとき、TryOver3::A4::Hogeという定数は定義されません。

TryOver3::TaskHelper という include すると task というクラスマクロが与えられる以下のようなモジュールがあります。
TryOver3::TaskHelper は include することで以下のような使い方ができます
irb(main):001:0> TryOver3::A3Task::Foo.run
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"
今回 TryOver3::TaskHelper では TryOver3::A5Task::Foo のように Foo クラスを作らず
TryOver3::A5Task.foo のようにクラスメソッドとして task で定義された名前のクラスメソッドでブロックを実行するように変更したいです。
現在 TryOver3::TaskHelper のユーザには TryOver3::A5Task::Foo.run のように生成されたクラスを使って実行しているユーザが存在します。
今回変更を加えても、その人たちにはこれまで通り生成されたクラスのrunメソッドでタスクを実行できるようにしておいて、
warning だけだしておくようにしたいです。
TryOver3::TaskHelper を修正してそれを実現してください。 なお、その際、クラスは実行されない限り生成されないものとします。

変更後想定する使い方
メソッドを使ったケース
irb(main):001:0> TryOver3::A5Task.foo
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"

クラスのrunメソッドを使ったケース
irb(main):001:0> TryOver3::A5Task::Foo.run
Warning: TryOver3::A5Task::Foo.run is deprecated
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"

# English

Q4
Please create a TryOver3::A4 class that can be executed as follows.
TryOver3::A4.runners = [:Hoge]
TryOver3::A4::Hoge.run
=> "run Hoge"
At this time, the constant TryOver3::A4::Hoge is not defined.

There is a module called TryOver3::TaskHelper that provides a class macro called task when included.
TryOver3::TaskHelper can be used as follows when included:
irb(main):001:0> TryOver3::A3Task::Foo.run
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"
This time, with TryOver3::TaskHelper, instead of creating a Foo class like TryOver3::A5Task::Foo,
we want to change it to execute the block with a class method of the name defined by task, like TryOver3::A5Task.foo.
Currently, some users of TryOver3::TaskHelper are executing using the generated class like TryOver3::A5Task::Foo.run.
Even with this change, we want to allow them to continue executing tasks with the run method of the generated class as before,
and just output a warning.
Please modify TryOver3::TaskHelper to achieve this. Note that classes should not be generated unless they are executed.

Expected usage after change
Case using method
irb(main):001:0> TryOver3::A5Task.foo
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"

Case using class run method
irb(main):001:0> TryOver3::A5Task::Foo.run
Warning: TryOver3::A5Task::Foo.run is deprecated
start 2020-01-07 18:03:10 +0900
finish 2020-01-07 18:03:10 +0900
=> "foo"
