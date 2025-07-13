// Block First Step Q4
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q4",
  "title": "Block First Step Q4",
  "title_en": "Block First Step Q4",
  "detailedDescription": "MyClosureクラスにincrementインスタンスメソッドを定義しましょう。このincrementメソッドは次のように数値を1ずつインクリメントして返します。\n\n```\nmy = MyClosure.new\nmy.increment #=> 1\nmy.increment #=> 2\nmy.increment #=> 3\n```\n\nそれに加えて、複数のインスタンスでカウンターを共有しているという特性があります。\n\n```\nmy1 = MyClosure.new\nmy2 = MyClosure.new\nmy1.increment #=> 1\nmy2.increment #=> 2\nmy1.increment #=> 3\n```\n\nさらなる制限として、カウンターとして利用する変数はローカル変数を利用してください(これをチェックするテストコードはないですが頑張ってローカル変数でテストを通るようにしてみてください)",
  "detailedDescription_en": "Define an increment instance method in the MyClosure class. This increment method increments a number by 1 and returns it as follows:\n\n```\nmy = MyClosure.new\nmy.increment #=> 1\nmy.increment #=> 2\nmy.increment #=> 3\n```\n\nIn addition, it has the characteristic that the counter is shared among multiple instances.\n\n```\nmy1 = MyClosure.new\nmy2 = MyClosure.new\nmy1.increment #=> 1\nmy2.increment #=> 2\nmy1.increment #=> 3\n```\n\nAs an additional restriction, please use a local variable for the counter variable (there is no test code to check this, but please try to pass the test using a local variable)",
  "problemCode": "class MyClosure\nend\n",
  "answerExplanation": "クロージャを実装してみる練習です。ブロックを利用するとスコープゲートなしで束縛を利用できるのでしたね。メソッド定義をdefではなくdefine_method にすることで外側のローカル変数への参照を持ち続けることができます。",
  "answerExplanation_en": "This is practice for implementing closures. You learned that using blocks allows you to use bindings without scope gates. By using define_method instead of def for method definition, you can maintain references to outer local variables.",
  "answerCode": "class MyClosure\n  count = 0\n\n  define_method :increment do\n    count += 1\n  end\nend\n",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\n  def test_my_closure\n    m1 = MyClosure.new\n    m2 = MyClosure.new\n    assert_equal(1, m1.increment)\n    assert_equal(2, m2.increment)\n    assert_equal(3, m1.increment)\n    MyClosure\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend\n"
};
