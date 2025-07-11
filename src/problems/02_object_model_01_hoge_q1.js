// Hoge Q1
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q1",
  "title": "Hoge Q1",
  "title_en": "Hoge Q1",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q1)",
  "description_en": "A problem to deepen understanding of Ruby's object model. Learn about the relationship between classes and instances, method lookup mechanisms, etc. (Q1)",
  "detailedDescription": "Hogeクラスは次の仕様を持つ\n\n- \"hoge\" という文字列の定数Hogeを持つ\n- \"hoge\" という文字列を返すhogehogeメソッドを持つ\n- HogeクラスのスーパークラスはStringである\n- 自身が\"hoge\"という文字列である時（HogeクラスはStringがスーパークラスなので、当然自身は文字列である）、trueを返すhoge?メソッドが定義されている",
  "detailedDescription_en": "The Hoge class has the following specifications:\n- Has a constant Hoge with the string \"hoge\"\n- Has a hogehoge method that returns the string \"hoge\"\n- The superclass of Hoge class is String\n- Has a hoge? method that returns true when itself is the string \"hoge\" (since the Hoge class has String as its superclass, it is naturally a string)",
  "problemCode": "class Hoge\nend\n",
  "answerExplanation": "ほぼ特筆するべきところがないですが、hoge?メソッドの実装は少し悩むかもしれません。\n自身を参照するにはselfを使います。",
  "answerExplanation_en": "There's nothing particularly noteworthy, but you might find the implementation of the hoge? method a bit puzzling.\nUse self to reference the instance itself.",
  "answerCode": "class Hoge < String\n  Hoge = 'hoge'\n\n  def hogehoge\n    'hoge'\n  end\n\n  def hoge?\n    self == 'hoge'\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestHoge < Minitest::Test\n  def test_hoge_const\n    assert_equal \"hoge\", Hoge::Hoge\n  end\n\n  def test_hogehoge_method_exists_in_hoge_class\n    assert Hoge.instance_methods(false).include?(:hogehoge)\n  end\n\n  def test_hogehoge_method_returns_hoge\n    assert_equal \"hoge\", Hoge.new.hogehoge\n  end\n\n  def test_hoge_super_class_is_string\n    assert_equal String, Hoge.superclass\n  end\n\n  def test_ask_hoge_myself_true\n    assert Hoge.new(\"hoge\").hoge?\n  end\n\n  def test_ask_hoge_myself_false\n    refute Hoge.new(\"foo\").hoge?\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
