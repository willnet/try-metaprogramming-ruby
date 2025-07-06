// Hoge Q2
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q2",
  "title": "Hoge Q2",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q2)",
  "problemCode": "# Q2.\n# 次に挙げるクラスのいかなるインスタンスからも、hogeメソッドが呼び出せるようにする\n# それらのhogeメソッドは、全て\"hoge\"という文字列を返す\n# - String\n# - Integer\n# - Numeric\n# - Class\n# - Hash\n# - TrueClass",
  "answerCode": "# Q2. 問題の解説\n#\n# 回答例ではObjectクラスにhogeメソッドを定義しました。仕様としてあげられているクラスはすべて\n# Objectクラスのサブクラスなので、Objectクラスのインスタンスメソッドとしてhogeを定義すると仕様を満たせます。\n# Objectクラスではなく、仕様としてあげられていた各クラス(String, Integer, Numeric, Class, Hash, TrueClass)\n# に対してそれぞれ個別にhogeメソッドを定義しても問題ありません。\nclass Object\n  def hoge\n    'hoge'\n  end\nend",
  "testCode": "require 'minitest'\n\nclass TestHoge < Minitest::Test\ndef test_hoge_in_integer\n    assert_equal \"hoge\", 1.hoge\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
