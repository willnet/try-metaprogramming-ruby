// Block First Step Q1
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q1",
  "title": "Block First Step Q1",
  "title_en": "Block First Step Q1",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q1)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q1)",
  "detailedDescription": "MyMathクラスに、ブロックを実行した結果(数値)を2倍にして返すtwo_timesインスタンスメソッドを定義しましょう。\n\n実行例: `MyMath.new.two_times { 2 } #=> 4`",
  "detailedDescription_en": "Define a two_times instance method in the MyMath class that executes a block and returns the result (number) doubled\n\nExample: `MyMath.new.two_times { 2 } #=> 4`",
  "problemCode": "class MyMath\nend",
  "answerExplanation": "Q1. 問題の解説\n\nyieldもしくはcallメソッドを使うメソッド実装の練習です。Railsでアプリケーションを書いているとそれほどブロックを取る\nメソッドを書く機会はないのですが、素振りをしておいていざというときに使えるようにしておくと役に立つ時が来るかもしれません",
  "answerExplanation_en": "Q1. Problem Explanation\n\nThis is practice for implementing methods using yield or the call method. When writing Rails applications, there aren't many opportunities to write methods that take blocks, but practicing this might come in handy when you need it.",
  "answerCode": "class MyMath\n  def two_times\n    yield * 2\n  end\nend",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_my_math\n    assert_equal 4, MyMath.new.two_times { 2 }\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
