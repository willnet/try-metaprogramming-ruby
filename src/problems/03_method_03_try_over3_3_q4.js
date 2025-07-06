// Try Over3 3 Q4
export const problem = {
  "section": "03_method",
  "id": "03_try_over3_3_q4",
  "title": "Try Over3 3 Q4",
  "description": "高度なメタプログラミング技術の問題。method_missing、プロキシオブジェクト、const_missing、DSLの実装などを学びます。 (Q4)",
  "problemCode": `TryOver3 = Module.new

# Q4
# 以下のように実行できる TryOver3::A4 クラスを作成してください。
# TryOver3::A4.runners = [:Hoge]
# TryOver3::A4::Hoge.run
# # => "run Hoge"
# このとき、TryOver3::A4::Hogeという定数は定義されません。


# Q5. チャレンジ問題！ 挑戦する方はテストの skip を外して挑戦してみてください。
#
# TryOver3::TaskHelper という include すると task というクラスマクロが与えられる以下のようなモジュールがあります。
module TryOver3::TaskHelper
  def self.included(klass)
    klass.define_singleton_method :task do |name, &task_block|
      new_klass = Class.new do
        define_singleton_method :run do
          puts "start #{Time.now}"
          block_return = task_block.call
          puts "finish #{Time.now}"
          block_return
        end
      end
      new_klass_name = name.to_s.split("_").map{ |w| w[0] = w[0].upcase; w }.join
      const_set(new_klass_name, new_klass)
    end
  end
end

# TryOver3::TaskHelper は include することで以下のような使い方ができます
class TryOver3::A5Task
  include TryOver3::TaskHelper

  task :foo do
    "foo"
  end
end
# irb(main):001:0> TryOver3::A3Task::Foo.run
# start 2020-01-07 18:03:10 +0900
# finish 2020-01-07 18:03:10 +0900
# => "foo"

# 今回 TryOver3::TaskHelper では TryOver3::A5Task::Foo のように Foo クラスを作らず
# TryOver3::A5Task.foo のようにクラスメソッドとして task で定義された名前のクラスメソッドでブロックを実行するように変更したいです。
# 現在 TryOver3::TaskHelper のユーザには TryOver3::A5Task::Foo.run のように生成されたクラスを使って実行しているユーザが存在します。
# 今回変更を加えても、その人たちにはこれまで通り生成されたクラスのrunメソッドでタスクを実行できるようにしておいて、
# warning だけだしておくようにしたいです。
# TryOver3::TaskHelper を修正してそれを実現してください。 なお、その際、クラスは実行されない限り生成されないものとします。
#
# 変更後想定する使い方
# メソッドを使ったケース
# irb(main):001:0> TryOver3::A5Task.foo
# start 2020-01-07 18:03:10 +0900
# finish 2020-01-07 18:03:10 +0900
# => "foo"
#
# クラスのrunメソッドを使ったケース
# irb(main):001:0> TryOver3::A5Task::Foo.run
# Warning: TryOver3::A5Task::Foo.run is deprecated
# start 2020-01-07 18:03:10 +0900
# finish 2020-01-07 18:03:10 +0900
# => "foo"`,
  "answerCode": `TryOver3 = Module.new

# Q4. 問題の解説
#
# const_missingを利用して、runners=で定義した定数を参照したときにrunメソッドを持つオブジェクトを返すことで
# 仕様を満たしています。回答例ではObject.newでオブジェクトを生成しましたが、runメソッドを持つオブジェクトであれば
# どんなクラスのインスタンスでもOKです。
#
class TryOver3::A4
  def self.const_missing(const)
    if @consts.include?(const)
      obj = Object.new
      obj.define_singleton_method(:run) { "run #{const}" }
      obj
    else
      super
    end
  end

  def self.runners=(consts)
    @consts = consts
  end
end`,
  "testCode": `require 'minitest'
require 'minitest/mock'

class TestTryOver03Q1 < Minitest::Test
def test_q4_call_class
    TryOver3::A4.runners = [:Hoge]
    assert_equal "run Hoge", TryOver3::A4::Hoge.run
  end

def test_q4_raise_error_when_called_not_runner_class
    TryOver3::A4.runners = [:Hoge]
    assert_raises(NameError) { TryOver3::A4::Foo }
  end

def test_q4_not_exists_runner_class
    TryOver3::A4.runners = [:Hoge]
    refute_includes(TryOver3::A4.constants, :Hoge)
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
