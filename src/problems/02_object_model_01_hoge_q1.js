// Hoge Q1
export const problem = {
  "section": "02_object_model",
  "id": "01_hoge_q1",
  "title": "Hoge Q1",
  "description": "Rubyのオブジェクトモデルについての理解を深める問題。クラスとインスタンスの関係、メソッド探索の仕組みなどを学びます。 (Q1)",
  "detailedDescription": `Q1.
Hogeクラスは次の仕様を持つ
"hoge" という文字列の定数Hogeを持つ
"hoge" という文字列を返すhogehogeメソッドを持つ
HogeクラスのスーパークラスはStringである
自身が"hoge"という文字列である時（HogeクラスはStringがスーパークラスなので、当然自身は文字列である）、trueを返すhoge?メソッドが定義されている`,
  "problemCode": `class Hoge
end`,
  "answerCode": `# Q1. 問題の解説
#
# ほぼ特筆するべきところがないですが、hoge?メソッドの実装は少し悩むかもしれません。
# 自身を参照するにはselfを使います。
#
class Hoge < String
  Hoge = 'hoge'

  def hogehoge
    'hoge'
  end

  def hoge?
    self == 'hoge'
  end
end`,
  "testCode": `require 'minitest'

class TestHoge < Minitest::Test
def test_hoge_in_string
    assert_equal "hoge","hoge".hoge
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
