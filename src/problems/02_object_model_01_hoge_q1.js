// Hoge Q1
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q1",
  "title": "Hoge Q1",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q1)",
  "problemCode": "# Q1.\n# Hogeクラスは次の仕様を持つ\n# \"hoge\" という文字列の定数Hogeを持つ\n# \"hoge\" という文字列を返すhogehogeメソッドを持つ\n# HogeクラスのスーパークラスはStringである\n# 自身が\"hoge\"という文字列である時（HogeクラスはStringがスーパークラスなので、当然自身は文字列である）、trueを返すhoge?メソッドが定義されている\n\nclass Hoge\nend",
  "answerCode": "# Q1. 問題の解説\n#\n# ほぼ特筆するべきところがないですが、hoge?メソッドの実装は少し悩むかもしれません。\n# 自身を参照するにはselfを使います。\n#\nclass Hoge < String\n  Hoge = 'hoge'\n\n  def hogehoge\n    'hoge'\n  end\n\n  def hoge?\n    self == 'hoge'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHoge < Minitest::Test\ndef test_hoge_in_string\n    assert_equal \"hoge\",\"hoge\".hoge\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
