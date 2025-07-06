// Try Over3 3 Q1
export const problem = {
  "section": "03_method",
  "id": "03_try_over3_3_q1",
  "title": "Try Over3 3 Q1",
  "title_en": "Try Over3 3 Q1",
  "description": "高度なメタプログラミング技術の問題。method_missing、プロキシオブジェクト、const_missing、DSLの実装などを学びます。 (Q1)",
  "description_en": "Advanced metaprogramming techniques problems. Learn about method_missing, proxy objects, const_missing, DSL implementation, etc. (Q1)",
  "detailedDescription": `Q1
以下要件を満たすクラス TryOver3::A1 を作成してください。
- run_test というインスタンスメソッドを持ち、それはnilを返す
- \`test_\` から始まるインスタンスメソッドが実行された場合、このクラスは \`run_test\` メソッドを実行する
# - \`test_\` メソッドがこのクラスに実装されていなくても \`test_\` から始まるメッセージに応答することができる
# - TryOver3::A1 には \`test_\` から始まるインスタンスメソッドが定義されていない`,
  "detailedDescription_en": `Q1
Please create a class TryOver3::A1 that meets the following requirements.
- It has an instance method called run_test that returns nil
- When an instance method starting with \`test_\` is executed, this class executes the \`run_test\` method
# - Even if the \`test_\` method is not implemented in this class, it can respond to messages starting with \`test_\`
# - TryOver3::A1 does not have any instance methods defined that start with \`test_\``,
  "problemCode": `TryOver3 = Module.new`,
  "answerCode": `TryOver3 = Module.new

# Q1. 問題の解説
#
# method_missingを利用してゴーストメソッドを作る問題です。
# respond_to_missing?はなくてもテストはパスしますが、method_missingを作るときにはセットで
# 定義しておくのがお作法なので回答例にはrespond_to_missing?も定義しています。
#
class TryOver3::A1
  def run_test
  end

  def method_missing(name, *)
    if name.to_s.start_with?('test_')
      run_test
    else
      super
    end
  end

  def respond_to_missing?(name, _)
    name.to_s.start_with?('test_')
  end
end`,
  "testCode": `require 'minitest'
require 'minitest/mock'

class TestTryOver03Q1 < Minitest::Test
def test_q1_called_run_test
    a1 = TryOver3::A1.new
    mock = Minitest::Mock.new
    a1.stub(:run_test, mock) do
      a1.test_hoge
    end
    assert mock.verify
  end

def test_q1_run_raise_error
    assert_raises(NoMethodError) { TryOver3::A1.new.testhoge }
  end

def test_q1_methods_not_included_test
    assert_equal false, TryOver3::A1.instance_methods(false).any? { |method_name| method_name.to_s.start_with?("test_") }
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
