// Hoge Q1
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q1",
  "title": "Hoge Q1",
  "title_en": "Hoge Q1",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q1)",
  "description_en": "A problem to deepen understanding of Ruby's object model. Learn about the relationship between classes and instances, method lookup mechanisms, etc. (Q1)",
  "detailedDescription": "Q1.\nHogeクラスは次の仕様を持つ\n\"hoge\" という文字列の定数Hogeを持つ\n\"hoge\" という文字列を返すhogehogeメソッドを持つ\nHogeクラスのスーパークラスはStringである\n自身が\"hoge\"という文字列である時（HogeクラスはStringがスーパークラスなので、当然自身は文字列である）、trueを返すhoge?メソッドが定義されている",
  "detailedDescription_en": "Q1.\nThe Hoge class has the following specifications:\n- Has a constant Hoge with the string \"hoge\"\n- Has a hogehoge method that returns the string \"hoge\"\n- The superclass of Hoge class is String\n- Has a hoge? method that returns true when itself is the string \"hoge\" (since the Hoge class has String as its superclass, it is naturally a string)",
  "problemCode": "class Hoge\nend",
  "answerExplanation": "Q1. 問題の解説\n\nほぼ特筆するべきところがないですが、hoge?メソッドの実装は少し悩むかもしれません。\n自身を参照するにはselfを使います。",
  "answerExplanation_en": "Q1. Problem Explanation\n\nThere's nothing particularly noteworthy, but you might find the implementation of the hoge? method a bit puzzling.\nUse self to reference the instance itself.",
  "answerCode": "class Hoge < String\n  Hoge = 'hoge'\n\n  def hogehoge\n    'hoge'\n  end\n\n  def hoge?\n    self == 'hoge'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHoge < Minitest::Test\ndef test_hoge_in_string\n    assert_equal \"hoge\",\"hoge\".hoge\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
