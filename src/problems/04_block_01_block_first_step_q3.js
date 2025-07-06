// Block First Step Q3
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q3",
  "title": "Block First Step Q3",
  "title_en": "Block First Step Q3",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q3)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q3)",
  "detailedDescription": `Q3.
MyBlockクラスにblock_to_procインスタンスメソッドを定義しましょう。block_to_procインスタンスメソッドはブロックを受け取り、
そのブロックをProcオブジェクトにしたものを返します`,
  "detailedDescription_en": `Q3.
Define a block_to_proc instance method in the MyBlock class. The block_to_proc instance method receives a block and returns it converted to a Proc object.`,
  "problemCode": `class MyBlock
end`,
  "answerExplanation": `Q3. 問題の解説

Q2と反対に、ブロックからProcオブジェクトの変換をする練習です。仮引数で&を使うとブロックからProcオブジェクトへの変換ができます。`,
  "answerExplanation_en": `Q3. Problem Explanation

Opposite to Q2, this is practice for converting from block to Proc object. By using & in the parameter, you can convert from block to Proc object.`,
  "answerCode": `class MyBlock
  def block_to_proc(&block)
    block
  end
end`,
  "testCode": `require 'minitest'

MY_LAMBDA = -> { 3 }

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
