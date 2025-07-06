// Hoge Q2
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q2",
  "title": "Hoge Q2",
  "title_en": "Hoge Q2",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q2)",
  "description_en": "A problem to deepen understanding of Ruby's object model. Learn about the relationship between classes and instances, method lookup mechanisms, etc. (Q2)",
  "detailedDescription": `Q2.
次に挙げるクラスのいかなるインスタンスからも、hogeメソッドが呼び出せるようにする
それらのhogeメソッドは、全て"hoge"という文字列を返す
- String
- Integer
- Numeric
- Class
- Hash
- TrueClass`,
  "detailedDescription_en": `Q2.
Make the hoge method callable from any instance of the following classes
All of these hoge methods should return the string "hoge"
- String
- Integer
- Numeric
- Class
- Hash
- TrueClass`,
  "problemCode": ``,
  "answerExplanation": `Q2. 問題の解説

回答例ではObjectクラスにhogeメソッドを定義しました。仕様としてあげられているクラスはすべて
Objectクラスのサブクラスなので、Objectクラスのインスタンスメソッドとしてhogeを定義すると仕様を満たせます。
Objectクラスではなく、仕様としてあげられていた各クラス(String, Integer, Numeric, Class, Hash, TrueClass)
に対してそれぞれ個別にhogeメソッドを定義しても問題ありません。`,
  "answerExplanation_en": `Q2. Problem Explanation

In the answer example, we defined the hoge method in the Object class. All the classes listed in the specification are subclasses of the Object class, so defining hoge as an instance method of Object class satisfies the specification.
Instead of the Object class, you could also define the hoge method individually for each of the classes listed in the specification (String, Integer, Numeric, Class, Hash, TrueClass).`,
  "answerCode": `class Object
  def hoge
    'hoge'
  end
end`,
  "testCode": `require 'minitest'

class TestHoge < Minitest::Test
def test_hoge_in_integer
    assert_equal "hoge", 1.hoge
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
