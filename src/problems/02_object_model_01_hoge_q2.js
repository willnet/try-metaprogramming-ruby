// Hoge Q2
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q2",
  "title": "Hoge Q2",
  "title_en": "Hoge Q2",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q2)",
  "description_en": "A problem to deepen understanding of Ruby's object model. Learn about the relationship between classes and instances, method lookup mechanisms, etc. (Q2)",
  "detailedDescription": "次に挙げるクラスのいかなるインスタンスからも、hogeメソッドが呼び出せるようにする\nそれらのhogeメソッドは、全て\"hoge\"という文字列を返す\n- String\n- Integer\n- Numeric\n- Class\n- Hash\n- TrueClass",
  "detailedDescription_en": "Make the hoge method callable from any instance of the following classes\nAll of these hoge methods should return the string \"hoge\"\n- String\n- Integer\n- Numeric\n- Class\n- Hash\n- TrueClass",
  "problemCode": "# This problem is answer-only (no starter code provided)\n",
  "answerExplanation": "Q2. 問題の解説\n\n回答例ではObjectクラスにhogeメソッドを定義しました。仕様としてあげられているクラスはすべて\nObjectクラスのサブクラスなので、Objectクラスのインスタンスメソッドとしてhogeを定義すると仕様を満たせます。\nObjectクラスではなく、仕様としてあげられていた各クラス(String, Integer, Numeric, Class, Hash, TrueClass)\nに対してそれぞれ個別にhogeメソッドを定義しても問題ありません。",
  "answerExplanation_en": "Q2. Problem Explanation\n\nIn the answer example, we defined the hoge method in the Object class. All the classes listed in the specification are subclasses of the Object class, so defining hoge as an instance method of Object class satisfies the specification.\nInstead of the Object class, you could also define the hoge method individually for each of the classes listed in the specification (String, Integer, Numeric, Class, Hash, TrueClass).",
  "answerCode": "class Object\n  def hoge\n    'hoge'\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass TestHoge < Minitest::Test\n  def test_hoge_in_integer\n    assert_equal 'hoge', 1.hoge\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
