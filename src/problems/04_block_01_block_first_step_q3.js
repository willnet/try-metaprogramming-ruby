// Block First Step Q3
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q3",
  "title": "Block First Step Q3",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q3)",
  "detailedDescription": `Q3.
MyBlockクラスにblock_to_procインスタンスメソッドを定義しましょう。block_to_procインスタンスメソッドはブロックを受け取り、
そのブロックをProcオブジェクトにしたものを返します`,
  "problemCode": `class MyBlock
end`,
  "answerCode": `# Q3. 問題の解説
#
# Q2と反対に、ブロックからProcオブジェクトの変換をする練習です。仮引数で&を使うとブロックからProcオブジェクトへの変換ができます。
class MyBlock
  def block_to_proc(&block)
    block
  end
end`,
  "testCode": `require 'minitest'

class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

class TestBlockFirstStep < Minitest::Test
def test_my_block
    assert_equal(MY_LAMBDA, MyBlock.new.block_to_proc(&MY_LAMBDA))
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
