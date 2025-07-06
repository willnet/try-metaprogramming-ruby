// Block First Step Q2
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q2",
  "title": "Block First Step Q2",
  "title_en": "Block First Step Q2",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q2)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q2)",
  "detailedDescription": "AcceptBlockクラスにcallクラスメソッドが予め定義されており、このメソッドがブロックをとるとします。\n\n実行例: `AcceptBlock.call { 2 }`\n\nこのメソッドを、下で用意されているMY_LAMBDAをブロック引数として渡して実行してみてください。",
  "detailedDescription_en": "AcceptBlock class has a predefined call class method that takes a block.\n\nExample: `AcceptBlock.call { 2 }`\n\nPlease execute this method by passing MY_LAMBDA prepared below as a block argument.",
  "problemCode": "# AcceptBlockクラスは問題側で用意している(テスト中に実装している)ため実装の必要はありません。\n\nMY_LAMBDA = -> { 3 }",
  "answerExplanation": "Q2. 問題の解説\n\nProcオブジェクトをブロック引数として渡す練習です。実引数を渡すところで`&`を使うと、Procからブロックへの変換ができます。",
  "answerExplanation_en": "Q2. Problem Explanation\n\nThis is practice for passing a Proc object as a block argument. By using `&` when passing the actual argument, you can convert from Proc to block.",
  "answerCode": "MY_LAMBDA = -> { 3 }\nAcceptBlock.call(&MY_LAMBDA)",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_accept_block\n    assert AcceptBlock.result\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
