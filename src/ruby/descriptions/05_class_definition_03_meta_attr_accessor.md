# 日本語

下のMetaClassに対し、次のように`meta_`というプレフィックスが属性名に自動でつき、ゲッターの戻り値の文字列にも'meta 'が自動でつくattr_accessorのようなメソッドであるmeta_attr_accessorを作ってください。セッターに文字列以外の引数がくることは考えないとします。

使用例:

```
class MetaClass
  # meta_attr_accessor自体の定義は省略
  meta_attr_accessor :hello
end
meta = MetaClass.new
meta.meta_hello = 'world'
meta.meta_hello #=> 'meta world'
```

# English

For the MetaClass below, create a meta_attr_accessor method that automatically adds the prefix `meta_` to attribute names and 'meta ' to getter return value strings like attr_accessor. Assume that setter arguments other than strings will not be considered.

Usage example:

```
class MetaClass
  # Definition of meta_attr_accessor itself is omitted
  meta_attr_accessor :hello
end
meta = MetaClass.new
meta.meta_hello = 'world'
meta.meta_hello #=> 'meta world'
```