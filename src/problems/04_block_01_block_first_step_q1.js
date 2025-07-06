// Block First Step Q1
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q1",
  "title": "Block First Step Q1",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q1)",
  "problemCode": "# Q1.\n# MyMathクラスに、ブロックを実行した結果(数値)を2倍にして返すtwo_timesインスタンスメソッドを定義しましょう\n#    実行例: MyMath.new.two_times { 2 } #=> 4\n\nclass MyMath\nend",
  "answerCode": "# Q1. 問題の解説\n#\n# yieldもしくはcallメソッドを使うメソッド実装の練習です。Railsでアプリケーションを書いているとそれほどブロックを取る\n# メソッドを書く機会はないのですが、素振りをしておいていざというときに使えるようにしておくと役に立つ時が来るかもしれません\nclass MyMath\n  def two_times\n    yield * 2\n  end\nend",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_my_math\n    assert_equal 4, MyMath.new.two_times { 2 }\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
