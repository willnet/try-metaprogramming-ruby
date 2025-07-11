# 日本語

DefineのQ3ではOriginalAccessor の my_attr_accessor で定義した getter/setter に boolean の値が入っている場合には #{name}? が定義されるようなモジュールを実装しました。今回は、そのモジュールに boolean 以外が入っている場合には #{name}? メソッドが存在しないようにする変更を加えてください。

# English

In Q3 of Define, we implemented a module where #{name}? methods are defined when boolean values are assigned to getter/setter defined by OriginalAccessor's my_attr_accessor. This time, modify the module so that the #{name}? method does not exist when non-boolean values are assigned.
