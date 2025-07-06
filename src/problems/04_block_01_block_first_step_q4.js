// Block First Step Q4
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q4",
  "title": "Block First Step Q4",
  "title_en": "Block First Step Q4",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q4)",
  "description_en": "Basic problems about Ruby blocks. Learn about passing and executing blocks, and closures. (Q4)",
  "detailedDescription": `Q4.
MyClosureクラスにincrementインスタンスメソッドを定義しましょう。このincrementメソッドは次のように数値を1ずつインクリメントして返します
my = MyClosure.new
my.increment #=> 1
my.increment #=> 2
my.increment #=> 3
それに加えて、複数のインスタンスでカウンターを共有しているという特性があります。
my1 = MyClosure.new
my2 = MyClosure.new
my1.increment #=> 1
my2.increment #=> 2
my1.increment #=> 3`,
  "detailedDescription_en": `Q4.
Define an increment instance method in the MyClosure class. This increment method increments a number by 1 and returns it as follows:
my = MyClosure.new
my.increment #=> 1
my.increment #=> 2
my.increment #=> 3
In addition, it has the characteristic that the counter is shared among multiple instances.
my1 = MyClosure.new
my2 = MyClosure.new
my1.increment #=> 1
my2.increment #=> 2
my1.increment #=> 3`,
  "problemCode": `# さらなる制限として、カウンターとして利用する変数はローカル変数を利用してください(これはテストにはないですが頑張ってローカル変数でテストを通るようにしてみてください)

class MyClosure
end`,
  "answerExplanation": `Q4. 問題の解説

クロージャを実装してみる練習です。ブロックを利用するとスコープゲートなしで束縛を利用できるのでしたね。メソッド定義をdefではなく
define_method にすることで外側のローカル変数への参照を持ち続けることができます。`,
  "answerExplanation_en": `Q4. Problem Explanation

This is practice for implementing closures. You learned that using blocks allows you to use bindings without scope gates. By using define_method instead of def for method definition, you can maintain references to outer local variables.`,
  "answerCode": `class MyClosure
  count = 0

  define_method :increment do
    count += 1
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
def test_my_closure
    m1 = MyClosure.new
    m2 = MyClosure.new
    assert_equal(1, m1.increment)
    assert_equal(2, m2.increment)
    assert_equal(3, m1.increment)
    MyClosure
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
