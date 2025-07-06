// Block First Step Q4
export const problem = {
  "section": "04_block",
  "id": "01_block_first_step_q4",
  "title": "Block First Step Q4",
  "description": "Rubyのブロックについての基本的な問題。ブロックの受け渡しや実行、クロージャについて学びます。 (Q4)",
  "problemCode": "# Q4.\n# MyClosureクラスにincrementインスタンスメソッドを定義しましょう。このincrementメソッドは次のように数値を1ずつインクリメントして返します\n# my = MyClosure.new\n# my.increment #=> 1\n# my.increment #=> 2\n# my.increment #=> 3\n# それに加えて、複数のインスタンスでカウンターを共有しているという特性があります。\n# my1 = MyClosure.new\n# my2 = MyClosure.new\n# my1.increment #=> 1\n# my2.increment #=> 2\n# my1.increment #=> 3\n# さらなる制限として、カウンターとして利用する変数はローカル変数を利用してください(これはテストにはないですが頑張ってローカル変数でテストを通るようにしてみてください)\n\nclass MyClosure\nend",
  "answerCode": "# Q4. 問題の解説\n#\n# クロージャを実装してみる練習です。ブロックを利用するとスコープゲートなしで束縛を利用できるのでしたね。メソッド定義をdefではなく\n# define_method にすることで外側のローカル変数への参照を持ち続けることができます。\nclass MyClosure\n  count = 0\n\n  define_method :increment do\n    count += 1\n  end\nend",
  "testCode": "require 'minitest'\n\nclass AcceptBlock\n  class << self\n    attr_accessor :result\n  end\n\n  def self.call(&block)\n    @result = block == MY_LAMBDA\n  end\nend\n\nclass TestBlockFirstStep < Minitest::Test\ndef test_my_closure\n    m1 = MyClosure.new\n    m2 = MyClosure.new\n    assert_equal(1, m1.increment)\n    assert_equal(2, m2.increment)\n    assert_equal(3, m1.increment)\n    MyClosure\n  end\nend\n\ndef run_tests\n  parallel_executor = Object.new\n  def parallel_executor.shutdown\n    # nothing\n  end\n  Minitest.parallel_executor = parallel_executor\n  Minitest.run\nend"
};
