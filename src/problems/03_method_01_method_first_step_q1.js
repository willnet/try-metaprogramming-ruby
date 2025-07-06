// Method First Step Q1
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q1",
  "title": "Method First Step Q1",
  "title_en": "Method First Step Q1",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q1)",
  "description_en": "Basic problems about Ruby method definition. Learn dynamic method definition without using the def keyword. (Q1)",
  "detailedDescription": `Q1.
次の動作をする F1 class を実装する
- 1. "def"キーワードを使わずにF1クラスにhelloインスタンスメソッドを定義すること
     戻り値は "hello" であること
- 2. "def"キーワードを使わずにF1クラスにworldクラスメソッドを定義すること
     戻り値は "world" であること
- 3. 定義していないメソッドを実行したときにエラーを発生させず、"NoMethodError"という文字列を返すこと
- 4. \`F1.new.respond_to?(定義していないメソッド名)\` を実行したときにtrueを返すこと`,
  "detailedDescription_en": `Q1.
Implement an F1 class that behaves as follows
- 1. Define a hello instance method in F1 class without using the "def" keyword
     The return value should be "hello"
- 2. Define a world class method in F1 class without using the "def" keyword
     The return value should be "world"
- 3. When executing an undefined method, do not raise an error but return the string "NoMethodError"
- 4. When executing \`F1.new.respond_to?(undefined_method_name)\`, return true`,
  "problemCode": `class F1
end`,
  "answerExplanation": `Q1. 問題の解説

define_methodとdefine_singleton_methodとmethod_missingの素振り用の問題です。
define_singleton_methodは3章にはまだ出てきていませんが、これを知らないと3章の問題を解くのが難しくなるので覚えておいてください
respond_to_missing?は、respond_to?メソッド実行時にメソッドが定義されていない場合に呼ばれるメソッドです。method_missingを定義する場合は
必ず定義しておきましょう。`,
  "answerExplanation_en": `Q1. Problem Explanation

This is a practice problem for define_method, define_singleton_method, and method_missing.
define_singleton_method doesn't appear in Chapter 3 yet, but you need to know this to solve Chapter 3 problems, so please remember it.
respond_to_missing? is a method called when respond_to? method is executed and the method is not defined. Always define this when you define method_missing.`,
  "answerCode": `class F1
  define_method :hello do
    'hello'
  end

  define_singleton_method :world do
    'world'
  end

  def method_missing(*args)
    'NoMethodError'
  end

  def respond_to_missing?(*args)
    true
  end
end`,
  "testCode": `require 'minitest'

class TestMethodFirstStep < Minitest::Test
def test_hello
    assert_equal F1.new.hello, 'hello'
  end
end

def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end`
};
