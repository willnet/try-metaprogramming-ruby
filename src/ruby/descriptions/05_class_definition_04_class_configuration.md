# 日本語

次のようなExConfigクラスを作成してください。ただし、グローバル変数、クラス変数は使わないものとします。

使用例:

```
ExConfig.config = 'hello'
ExConfig.config #=> 'hello'
ex = ExConfig.new
ex.config #=> 'hello'
ex.config = 'world'
ExConfig.config #=> 'world'
```

# English

Create an ExConfig class as follows. However, do not use global variables or class variables.

Usage example:

```
ExConfig.config = 'hello'
ExConfig.config #=> 'hello'
ex = ExConfig.new
ex.config #=> 'hello'
ex.config = 'world'
ExConfig.config #=> 'world'
```