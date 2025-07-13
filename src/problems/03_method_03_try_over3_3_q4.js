// Try Over3 3 Q4
export const problem = {
  "section": "03_method",
  "id": "03_try_over3_3_q4",
  "title": "Try Over3 3 Q4",
  "title_en": "Try Over3 3 Q4",
  "detailedDescription": "以下のように実行できる TryOver3::A4 クラスを作成してください。\n\n```\nTryOver3::A4.runners = [:Hoge]\nTryOver3::A4::Hoge.run\n=> \"run Hoge\"\n```\n\nこのとき、TryOver3::A4::Hogeという定数は定義されません。",
  "detailedDescription_en": "Please create a TryOver3::A4 class that can be executed as follows.\n\n```\nTryOver3::A4.runners = [:Hoge]\nTryOver3::A4::Hoge.run\n=> \"run Hoge\"\n```\n\nAt this time, the constant TryOver3::A4::Hoge is not defined.",
  "problemCode": "",
  "answerCode": "TryOver3 = Module.new\n\nclass TryOver3::A4\n  def self.const_missing(const)\n    if @consts.include?(const)\n      obj = Object.new\n      obj.define_singleton_method(:run) { \"run #{const}\" }\n      obj\n    else\n      super\n    end\n  end\n\n  def self.runners=(consts)\n    @consts = consts\n  end\nend\n",
  "testCode": "require 'minitest'\nrequire 'minitest/mock'\n\nclass TestTryOver03Q1 < Minitest::Test\n  def test_q4_call_class\n    TryOver3::A4.runners = [:Hoge]\n    assert_equal 'run Hoge', TryOver3::A4::Hoge.run\n  end\n\n  def test_q4_raise_error_when_called_not_runner_class\n    TryOver3::A4.runners = [:Hoge]\n    assert_raises(NameError) { TryOver3::A4::Foo }\n  end\n\n  def test_q4_not_exists_runner_class\n    TryOver3::A4.runners = [:Hoge]\n    refute_includes(TryOver3::A4.constants, :Hoge)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "const_missingを利用して、runners=で定義した定数を参照したときにrunメソッドを持つオブジェクトを返すことで仕様を満たしています。回答例ではObject.newでオブジェクトを生成しましたが、runメソッドを持つオブジェクトであればどんなクラスのインスタンスでもOKです。",
  "answerExplanation_en": "By using const_missing, the specification is satisfied by returning an object with a run method when referencing constants defined by runners=. In the answer example, we created an object with Object.new, but any instance of any class is acceptable as long as it has a run method."
};
