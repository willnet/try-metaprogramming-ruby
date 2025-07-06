// Method First Step Q2
export const problem = {
  "section": "03_method",
  "id": "01_method_first_step_q2",
  "title": "Method First Step Q2",
  "description": "Rubyのメソッド定義についての基本的な問題。defキーワードを使わない動的なメソッド定義を学びます。 (Q2)",
  "detailedDescription": `Q2.
次の動作をする F2 classを実装する
- 1. 実行するとhiインスタンスメソッドを定義するadd_hiメソッドを定義すること`,
  "problemCode": `class F2
end`,
  "answerExplanation": `Q2. 問題の解説

メソッドを実行したら新しいメソッドができる、ということを実感してもらうための問題です。この回答のようなdefがネストする実装は普通はやりませんが、
「特定の処理を実行する時に動的にメソッドを生やす」という場面は、メタプロをしていればそれなりにあります。`,
  "answerCode": `class F2
  def add_hi
    def hi
    end
  end
end`,
  "testCode": `require 'minitest'

class TestMethodFirstStep < Minitest::Test
def test_world
    assert_equal F1.world, 'world'
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
