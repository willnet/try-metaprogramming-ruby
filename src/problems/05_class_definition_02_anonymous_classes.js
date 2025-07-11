// Anonymous Classes
export const problem = {
  "section": "05_class_definition",
  "id": "02_anonymous_classes",
  "title": "Anonymous Classes",
  "title_en": "Anonymous Classes",
  "description": "Rubyの無名クラスについての問題。定数に代入しないクラスの作成方法を学びます。",
  "description_en": "A problem about Ruby anonymous classes. Learn how to create classes without assigning them to constants.",
  "detailedDescription": "ExClassを継承したクラスを作成してください。ただし、そのクラスは定数がない無名のクラスだとします。その無名クラスをそのままJudgement2.call の引数として渡してください(Judgement2.callはテスト側で定義するので実装は不要です)",
  "detailedDescription_en": "Create a class that inherits from ExClass. However, assume that the class is an anonymous class without constants. Pass that anonymous class directly as an argument to Judgement2.call (Judgement2.call is defined on the test side, so implementation is not required).",
  "problemCode": "class ExClass\nend\n",
  "answerCode": "class ExClass\nend\n\nanonymous_class = Class.new(ExClass)\nJudgement2.call(anonymous_class)\n",
  "testCode": "require 'minitest'\n\nclass Judgement2\n  def self.call(klass)\n    @klass = klass\n  end\nend\n\nclass TestAnonymousClasses < Minitest::Test\n  def test_anonymous_class_inheritance\n    klass = Judgement2.instance_variable_get(:@klass)\n    assert klass.name.nil?\n    assert klass.superclass == ExClass\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n",
  "answerExplanation": "無名クラスの作成練習です。Class.newを使って定数に代入しないクラスを作成します。無名クラスは名前がないため、クラス名を取得するとnilが返されます。",
  "answerExplanation_en": "This is practice for creating anonymous classes. Use Class.new to create a class without assigning it to a constant. Anonymous classes have no name, so calling .name on them returns nil."
};
