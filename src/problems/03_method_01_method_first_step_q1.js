// Method First Step Q1
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q1",
  "title": "Method First Step Q1",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q1)",
  "detailedDescription": `Q1.
次の動作をする F1 class を実装する
- 1. "def"キーワードを使わずにF1クラスにhelloインスタンスメソッドを定義すること
     戻り値は "hello" であること
- 2. "def"キーワードを使わずにF1クラスにworldクラスメソッドを定義すること
     戻り値は "world" であること
- 3. 定義していないメソッドを実行したときにエラーを発生させず、"NoMethodError"という文字列を返すこと
- 4. \`F1.new.respond_to?(定義していないメソッド名)\` を実行したときにtrueを返すこと`,
  "problemCode": `class F1
end`,
  "answerExplanation": `Q1. 問題の解説

define_methodとdefine_singleton_methodとmethod_missingの素振り用の問題です。
define_singleton_methodは3章にはまだ出てきていませんが、これを知らないと3章の問題を解くのが難しくなるので覚えておいてください
respond_to_missing?は、respond_to?メソッド実行時にメソッドが定義されていない場合に呼ばれるメソッドです。method_missingを定義する場合は
必ず定義しておきましょう。`,
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
