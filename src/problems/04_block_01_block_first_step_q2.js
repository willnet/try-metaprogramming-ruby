// Block First Step Q2
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q2",
  "title": "Block First Step Q2",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q2)",
  "problemCode": "# Q2.\n# AcceptBlockクラスにcallクラスメソッドが予め定義されており、このメソッドがブロックをとるとします。\n# 実行例: AcceptBlock.call { 2 }\n# このメソッドを、下で用意されているMY_LAMBDAをブロック引数として渡して実行してみてください。\n# AcceptBlockクラスは問題側で用意している(テスト中に実装している)ため実装の必要はありません。\n\nMY_LAMBDA = -> { 3 }",
  "answerCode": "# Q2. 問題の解説\n#\n# Procオブジェクトをブロック引数として渡す練習です。実引数を渡すところで`&`を使うと、Procからブロックへの変換ができます。\nMY_LAMBDA = -> { 3 }\nAcceptBlock.call(&MY_LAMBDA)",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_accept_block\n    assert AcceptBlock.result\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
