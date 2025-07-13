// Singleton Methods
export const problem = {
  "section": "05_class_definition",
  "id": "01_singleton_methods",
  "title": "Singleton Methods",
  "title_en": "Singleton Methods",
  "detailedDescription": "ExClassクラスのオブジェクトが2つあります。これらをJudgement.callに渡しています。Judement.callはテスト側で定義するので実装は不要です。この状況でe2オブジェクト\"だけ\"helloメソッドを使えるようにしてください。helloメソッドの中身は何でも良いです。",
  "detailedDescription_en": "There are two ExClass objects. These are passed to Judgement.call. Judgement.call is defined on the test side, so implementation is not required. In this situation, please make \"only\" the e2 object able to use the hello method. The content of the hello method can be anything.",
  "problemCode": "class ExClass\nend\n\ne1 = ExClass.new\ne2 = ExClass.new\n",
  "answerCode": "class ExClass\nend\n\ne1 = ExClass.new\ne2 = ExClass.new\n\ndef e2.hello\n  'Hello from e2!'\nend\n\nJudgement.call(e1, e2)\n",
  "testCode": "require 'minitest'\n\nclass Judgement\n  def self.call(e1, e2)\n    @e1 = e1\n    @e2 = e2\n  end\nend\n\nclass TestSingletonMethods < Minitest::Test\n  def test_singleton_method_only_on_e2\n    e1 = Judgement.instance_variable_get(:@e1)\n    e2 = Judgement.instance_variable_get(:@e2)\n    assert e1.is_a?(ExClass)\n    assert e2.is_a?(ExClass)\n    refute e1.respond_to?(:hello)\n    assert e2.respond_to?(:hello)\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "e2オブジェクトの特異メソッドとしてhelloを定義する練習です。特異メソッドは対象のオブジェクトだけが利用可能なメソッドです。",
  "answerExplanation_en": "This is practice for defining hello as a singleton method of the e2 object. Singleton methods are methods that can only be used by the target object."
};
