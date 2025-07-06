# 日本語

MyClosureクラスにincrementインスタンスメソッドを定義しましょう。このincrementメソッドは次のように数値を1ずつインクリメントして返します。

```
my = MyClosure.new
my.increment #=> 1
my.increment #=> 2
my.increment #=> 3
```

それに加えて、複数のインスタンスでカウンターを共有しているという特性があります。

```
my1 = MyClosure.new
my2 = MyClosure.new
my1.increment #=> 1
my2.increment #=> 2
my1.increment #=> 3
```

# English

Define an increment instance method in the MyClosure class. This increment method increments a number by 1 and returns it as follows:

```
my = MyClosure.new
my.increment #=> 1
my.increment #=> 2
my.increment #=> 3
```

In addition, it has the characteristic that the counter is shared among multiple instances.

```
my1 = MyClosure.new
my2 = MyClosure.new
my1.increment #=> 1
my2.increment #=> 2
my1.increment #=> 3
```