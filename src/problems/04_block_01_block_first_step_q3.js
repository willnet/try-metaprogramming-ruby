// Block First Step Q3
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q3",
  "title": "Block First Step Q3",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q3)",
  "problemCode": "# Q3.\n# MyBlockクラスにblock_to_procインスタンスメソッドを定義しましょう。block_to_procインスタンスメソッドはブロックを受け取り、\n# そのブロックをProcオブジェクトにしたものを返します\n\nclass MyBlock\nend",
  "answerCode": "# Q3. 問題の解説\n#\n# Q2と反対に、ブロックからProcオブジェクトの変換をする練習です。仮引数で&を使うとブロックからProcオブジェクトへの変換ができます。\nclass MyBlock\n  def block_to_proc(&block)\n    block\n  end\nend",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_my_block\n    assert_equal(MY_LAMBDA, MyBlock.new.block_to_proc(&MY_LAMBDA))\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
