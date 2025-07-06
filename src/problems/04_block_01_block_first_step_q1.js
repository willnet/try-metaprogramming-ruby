// Block First Step Q1
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q1",
  "title": "Block First Step Q1",
  "title_en": "Block First Step Q1",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q1)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q1)",
  "detailedDescription": `Q1.
MyMathクラスに、ブロックを実行した結果(数値)を2倍にして返すtwo_timesインスタンスメソッドを定義しましょう
   実行例: MyMath.new.two_times { 2 } #=> 4`,
  "detailedDescription_en": `Q1.
Define a two_times instance method in the MyMath class that executes a block and returns the result (number) doubled
   Example: MyMath.new.two_times { 2 } #=> 4`,
  "problemCode": `class MyMath
end`,
  "answerExplanation": `Q1. 問題の解説

yieldもしくはcallメソッドを使うメソッド実装の練習です。Railsでアプリケーションを書いているとそれほどブロックを取る
メソッドを書く機会はないのですが、素振りをしておいていざというときに使えるようにしておくと役に立つ時が来るかもしれません`,
  "answerExplanation_en": `Q1. Problem Explanation

This is practice for implementing methods using yield or the call method. When writing Rails applications, there aren't many opportunities to write methods that take blocks, but practicing this might come in handy when you need it.`,
  "answerCode": `class MyMath
  def two_times
    yield * 2
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
def test_my_math
    assert_equal 4, MyMath.new.two_times { 2 }
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
