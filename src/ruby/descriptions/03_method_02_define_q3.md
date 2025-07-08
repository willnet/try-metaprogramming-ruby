# 日本語

次の動作をする OriginalAccessor モジュール を実装する

- OriginalAccessorモジュールはincludeされたときのみ、my_attr_accessorメソッドを定義すること
- my_attr_accessorはgetter/setterに加えて、boolean値を代入した際のみ真偽値判定を行うaccessorと同名の?メソッドができること

# English

Implement OriginalAccessor module that behaves as follows

- The OriginalAccessor module should define the my_attr_accessor method only when included
- my_attr_accessor should create getter/setter methods, and additionally create predicate methods (with ? suffix) only when boolean values are assigned