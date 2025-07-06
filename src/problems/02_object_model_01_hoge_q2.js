// Hoge Q2
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q2",
  "title": "Hoge Q2",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q2)",
  "detailedDescription": `Q2.
次に挙げるクラスのいかなるインスタンスからも、hogeメソッドが呼び出せるようにする
それらのhogeメソッドは、全て"hoge"という文字列を返す
- String
- Integer
- Numeric
- Class
- Hash
- TrueClass`,
  "problemCode": ``,
  "answerCode": `# Q2. 問題の解説
#
# 回答例ではObjectクラスにhogeメソッドを定義しました。仕様としてあげられているクラスはすべて
# Objectクラスのサブクラスなので、Objectクラスのインスタンスメソッドとしてhogeを定義すると仕様を満たせます。
# Objectクラスではなく、仕様としてあげられていた各クラス(String, Integer, Numeric, Class, Hash, TrueClass)
# に対してそれぞれ個別にhogeメソッドを定義しても問題ありません。
class Object
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
