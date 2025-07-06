// Block First Step Q2
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q2",
  "title": "Block First Step Q2",
  "title_en": "Block First Step Q2",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q2)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q2)",
  "detailedDescription": `Q2.
AcceptBlockクラスにcallクラスメソッドが予め定義されており、このメソッドがブロックをとるとします。
実行例: AcceptBlock.call { 2 }
このメソッドを、下で用意されているMY_LAMBDAをブロック引数として渡して実行してみてください。`,
  "detailedDescription_en": `Q2.
AcceptBlock class has a predefined call class method that takes a block.
Example: AcceptBlock.call { 2 }
Please execute this method by passing MY_LAMBDA prepared below as a block argument.`,
  "problemCode": `# AcceptBlockクラスは問題側で用意している(テスト中に実装している)ため実装の必要はありません。

MY_LAMBDA = -> { 3 }`,
  "answerExplanation": `Q2. 問題の解説

Procオブジェクトをブロック引数として渡す練習です。実引数を渡すところで\`&\`を使うと、Procからブロックへの変換ができます。`,
  "answerExplanation_en": `Q2. Problem Explanation

This is practice for passing a Proc object as a block argument. By using \`&\` when passing the actual argument, you can convert from Proc to block.`,
  "answerCode": `MY_LAMBDA = -> { 3 }
AcceptBlock.call(&MY_LAMBDA)`,
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
def test_accept_block
    assert AcceptBlock.result
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
