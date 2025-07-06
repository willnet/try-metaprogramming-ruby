// Block First Step Q3
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q3",
  "title": "Block First Step Q3",
  "title_en": "Block First Step Q3",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q3)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q3)",
  "detailedDescription": "MyBlockクラスにblock_to_procインスタンスメソッドを定義しましょう。block_to_procインスタンスメソッドはブロックを受け取り、\nそのブロックをProcオブジェクトにしたものを返します",
  "detailedDescription_en": "Define a block_to_proc instance method in the MyBlock class. The block_to_proc instance method receives a block and returns it converted to a Proc object.",
  "problemCode": "class MyBlock\nend",
  "answerExplanation": "Q3. 問題の解説\n\nQ2と反対に、ブロックからProcオブジェクトの変換をする練習です。仮引数で&を使うとブロックからProcオブジェクトへの変換ができます。",
  "answerExplanation_en": "Q3. Problem Explanation\n\nOpposite to Q2, this is practice for converting from block to Proc object. By using & in the parameter, you can convert from block to Proc object.",
  "answerCode": "class MyBlock\n  def block_to_proc(&block)\n    block\n  end\nend",
  "testCode": "require 'minitest'\n\nMY_LAMBDA = -> { 3 }\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_my_block\n    assert_equal(MY_LAMBDA, MyBlock.new.block_to_proc(&MY_LAMBDA))\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
