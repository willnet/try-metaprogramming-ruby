// Try Over3 3 Q1
export const problem = {
  "section": "03_method",
  "id": "03_try_over3_3_q1",
  "title": "Try Over3 3 Q1",
  "title_en": "Try Over3 3 Q1",
  "description": "高度なメタプログラミング技術の問題。method_missing、プロキシオブジェクト、const_missing、DSLの実装などを学びます。 (Q1)",
  "description_en": "Advanced metaprogramming techniques problems. Learn about method_missing, proxy objects, const_missing, DSL implementation, etc. (Q1)",
  "detailedDescription": "Q1\n以下要件を満たすクラス TryOver3::A1 を作成してください。\n- run_test というインスタンスメソッドを持ち、それはnilを返す\n- `test_` から始まるインスタンスメソッドが実行された場合、このクラスは `run_test` メソッドを実行する\n# - `test_` メソッドがこのクラスに実装されていなくても `test_` から始まるメッセージに応答することができる\n# - TryOver3::A1 には `test_` から始まるインスタンスメソッドが定義されていない",
  "detailedDescription_en": "Q1\nPlease create a class TryOver3::A1 that meets the following requirements.\n- It has an instance method called run_test that returns nil\n- When an instance method starting with `test_` is executed, this class executes the `run_test` method\n# - Even if the `test_` method is not implemented in this class, it can respond to messages starting with `test_`\n# - TryOver3::A1 does not have any instance methods defined that start with `test_`",
  "problemCode": "TryOver3 = Module.new",
  "answerCode": "TryOver3 = Module.new\n\n# Q1. 問題の解説\n#\n# method_missingを利用してゴーストメソッドを作る問題です。\n# respond_to_missing?はなくてもテストはパスしますが、method_missingを作るときにはセットで\n# 定義しておくのがお作法なので回答例にはrespond_to_missing?も定義しています。\n#\nclass TryOver3::A1\n  def run_test\n  end\n\n  def method_missing(name, *)\n    if name.to_s.start_with?('test_')\n      run_test\n    else\n      super\n    end\n  end\n\n  def respond_to_missing?(name, _)\n    name.to_s.start_with?('test_')\n  end\nend",
  "testCode": "require 'minitest'\nrequire 'minitest/mock'\n\nclass TestTryOver03Q1 < Minitest::Test\ndef test_q1_called_run_test\n    a1 = TryOver3::A1.new\n    mock = Minitest::Mock.new\n    a1.stub(:run_test, mock) do\n      a1.test_hoge\n    end\n    assert mock.verify\n  end\n\ndef test_q1_run_raise_error\n    assert_raises(NoMethodError) { TryOver3::A1.new.testhoge }\n  end\n\ndef test_q1_methods_not_included_test\n    assert_equal false, TryOver3::A1.instance_methods(false).any? { |method_name| method_name.to_s.start_with?(\"test_\") }\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend",
  "answerExplanation": "",
  "answerExplanation_en": ""
};
