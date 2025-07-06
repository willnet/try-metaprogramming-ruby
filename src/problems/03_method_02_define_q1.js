// Define Q1
export const problem = {
  "section": "03_method",
  "id": "02_define_q1",
  "title": "Define Q1",
  "title_en": "Define Q1",
  "description": "Rubyのメソッド定義と呼び出しについての問題。動的なメソッド定義やオリジナルアクセサの実装を学びます。 (Q1)",
  "description_en": "A problem about Ruby method definition and calling. Learn dynamic method definition and original accessor implementation. (Q1)",
  "detailedDescription": "次の動作をする A1 class を実装する\n\n- \"//\" を返す \"//\"メソッドが存在すること",
  "detailedDescription_en": "Implement A1 class that behaves as follows\n- A \"//\" method that returns \"//\" exists",
  "problemCode": "",
  "answerExplanation": "Q1.\n\n問題の解説\ndefだとSyntaxErrorになってしまうようなメソッド名でも、define_methodを使うことでメソッドとして定義することができます。",
  "answerExplanation_en": "Q1.\n\nProblem Explanation\nEven method names that would cause a SyntaxError with def can be defined as methods using define_method.",
  "answerCode": "class A1\n  define_method '//' do\n    '//'\n  end\nend\n\n# Q2\n#\n# 問題の解説\n# defind_singleton_methodを利用して動的に特異メソッドを定義することで、条件2を満たしています。\n# define_methodはModuleのインスタンスメソッドなので、initializeメソッド中では使えません。\n# A2.define_methodのようにすれば使えますが、それだとA2クラスのインスタンスメソッドになるので\n# すべてのA2インスタンスで利用できてしまい、\n# 「メソッドが定義されるのは同時に生成されるオブジェクトのみで、別のA2インスタンスには（同じ値を含む配列を生成時に渡さない限り）定義されない」\n# という仕様を満たすことができません。\n#\nclass A2\n  def initialize(ary)\n    ary.each do |name|\n      method_name = \"hoge_#{name}\"\n\n      define_singleton_method method_name do |times|\n        if times.nil?\n          dev_team\n        else\n          method_name * times\n        end\n      end\n    end\n  end\n\n  def dev_team\n    'SmartHR Dev Team'\n  end\nend\n\n# Q3.\n#\n# 問題の解説\n# 3章にはまだ登場していない概念ですが、includedフックを利用してモジュールがincludeされたときの振る舞いを記述しています。\n# my_attr_accessorメソッドはクラスメソッドに相当するため、includedメソッドの引数として渡されてきたクラスに直接define_singleton_methodでメソッドを追加しています。\n# さらにmy_attr_accessorメソッド実行時にインスタンスメソッドを追加するためにdefine_methodを利用しています。\n# セッターで定義した値を格納するために`@my_attr_accessor`をハッシュとして定義して利用しています。\n# `?`つきのメソッドを定義するために、セッター実行時にdefine_aingleton_methodでメソッドを追加しています。\n#\nmodule OriginalAccessor\n  def self.included(base)\n    base.define_singleton_method(:my_attr_accessor) do |attr|\n      base.define_method attr do\n        @my_attr_accessor&.fetch(attr) { nil }\n      end\n\n      base.define_method \"#{attr}=\" do |value|\n        (@my_attr_accessor ||= {})[attr] = value\n\n        if value.is_a?(TrueClass) || value.is_a?(FalseClass)\n          define_singleton_method \"#{attr}?\" do\n            !!value\n          end\n        end\n      end\n    end\n  end\nend",
  "testCode": "require 'minitest'\nrequire 'securerandom'\n\nclass TestDefine < Minitest::Test\ndef test_answer_a1\n    assert_equal \"//\", A1.new.send(\"//\".to_sym)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
