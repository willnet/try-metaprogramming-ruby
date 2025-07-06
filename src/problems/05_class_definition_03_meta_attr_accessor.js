// Meta Attr Accessor
export const problem = {
  "section": "05_class_definition",
  "id": "03_meta_attr_accessor",
  "title": "Meta Attr Accessor",
  "title_en": "Meta Attr Accessor",
  "description": "動的なアクセサメソッド作成についての問題。プレフィックス付きアクセサの実装方法を学びます。",
  "description_en": "A problem about creating dynamic accessor methods. Learn how to implement accessors with prefixes.",
  "detailedDescription": "下のMetaClassに対し、次のように`meta_`というプレフィックスが属性名に自動でつき、ゲッターの戻り値の文字列にも'meta 'が自動でつくattr_accessorのようなメソッドであるmeta_attr_accessorを作ってください。セッターに文字列以外の引数がくることは考えないとします。\n\n使用例:\n\n```\nclass MetaClass\n  # meta_attr_accessor自体の定義は省略\n  meta_attr_accessor :hello\nend\nmeta = MetaClass.new\nmeta.meta_hello = 'world'\nmeta.meta_hello #=> 'meta world'\n```",
  "detailedDescription_en": "For the MetaClass below, create a meta_attr_accessor method that automatically adds the prefix `meta_` to attribute names and 'meta ' to getter return value strings like attr_accessor. Assume that setter arguments other than strings will not be considered.\n\nUsage example:\n\n```\nclass MetaClass\n  # Definition of meta_attr_accessor itself is omitted\n  meta_attr_accessor :hello\nend\nmeta = MetaClass.new\nmeta.meta_hello = 'world'\nmeta.meta_hello #=> 'meta world'\n```",
  "problemCode": "class MetaClass\n  # Define meta_attr_accessor method here\nend",
  "answerCode": "class MetaClass\n  def self.meta_attr_accessor(name)\n    define_method(\"meta_#{name}\") do\n      instance_variable_get(\"@meta_#{name}\")\n    end\n    \n    define_method(\"meta_#{name}=\") do |value|\n      instance_variable_set(\"@meta_#{name}\", \"meta #{value}\")\n    end\n  end\n  \n  meta_attr_accessor :hello\nend",
  "testCode": "require 'minitest'\n\nclass TestMetaAttrAccessor < Minitest::Test\n  def test_meta_attr_accessor_functionality\n    meta = MetaClass.new\n    \n    # Test setter\n    meta.meta_hello = 'world'\n    \n    # Test getter returns value with 'meta ' prefix\n    assert_equal 'meta world', meta.meta_hello\n  end\n  \n  def test_meta_attr_accessor_with_different_values\n    meta = MetaClass.new\n    \n    meta.meta_hello = 'test'\n    assert_equal 'meta test', meta.meta_hello\n    \n    meta.meta_hello = 'ruby'\n    assert_equal 'meta ruby', meta.meta_hello\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend",
  "answerExplanation": "動的なメソッド定義の練習です。define_methodを使ってゲッターとセッターを動的に作成します。セッターでは値に'meta 'プレフィックスを付けて保存し、ゲッターでその値を返します。",
  "answerExplanation_en": "This is practice for dynamic method definition. Use define_method to dynamically create getters and setters. The setter stores the value with a 'meta ' prefix, and the getter returns that value."
};
