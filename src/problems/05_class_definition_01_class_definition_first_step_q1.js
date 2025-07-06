// Class Definition First Step Q1
export const problem = {
  "section": "05_class_definition",
  "id": "01_class_definition_first_step_q1",
  "title": "Class Definition First Step Q1",
  "description": "Rubyのクラス定義についての基本的な問題。無名クラス、メタプログラミング、スコープゲートなどを学びます。 (Q1)",
  "detailedDescription": `1. ExClassクラスのオブジェクトが2つあります。これらをJudgement.callに渡しています。
   使えるようにしてください。helloメソッドの中身は何でも良いです。
2. ExClassを継承したクラスを作成してください。ただし、そのクラスは定数がない無名のクラスだとします。
3. 下のMetaClassに対し、次のように\`meta_\`というプレフィックスが属性名に自動でつき、ゲッターの戻り値の文字列にも'meta 'が自動でつく
#    attr_accessorのようなメソッドであるmeta_attr_accessorを作ってください。セッターに文字列以外の引数がくることは考えないとします。
#
#    使用例:
#
#    class MetaClass
#      # meta_attr_accessor自体の定義は省略
#      meta_attr_accessor :hello
#    end
#    meta = MetaClass.new
#    meta.meta_hello = 'world'
#    meta.meta_hello #=> 'meta world'
# 4. 次のようなExConfigクラスを作成してください。ただし、グローバル変数、クラス変数は使わないものとします。
#    使用例:
#    ExConfig.config = 'hello'
#    ExConfig.config #=> 'hello'
#    ex = ExConfig.new
#    ex.config #=> 'hello'
#    ex.config = 'world'
#    ExConfig.config #=> 'world'
# 5.
# ExOver#helloというメソッドがライブラリとして定義されているとします。ExOver#helloメソッドを実行したとき、
# helloメソッドの前にExOver#before、helloメソッドの後にExOver#afterを実行させるようにExOverを変更しましょう。
#
# 6. 次の toplevellocal ローカル変数の中身を返す MyGreeting#say を実装してみてください。
#    ただし、下のMyGreetingは編集しないものとします。toplevellocal ローカル変数の定義の下の行から編集してください。`,
  "problemCode": `#    Judement.callはテスト側で定義するので実装は不要です。この状況でe2オブジェクト"だけ"helloメソッドを

class ExClass
end

e1 = ExClass.new
e2 = ExClass.new

Judgement.call(e1, e2)

#    その無名クラスをそのままJudgement2.call の引数として渡してください(Judgement2.callはテスト側で定義するので実装は不要です)



class MetaClass
end



class ExConfig
end

# ただしExOver#hello, ExOver#before, ExOver#afterの実装はそれぞれテスト側で定義しているので実装不要(変更不可)です。


class ExOver
end

#    ヒント: スコープゲートを乗り越える方法について書籍にありましたね

class MyGreeting
end

toplevellocal = 'hi'`,
  "answerCode": `# Q1. 問題の解説
# e2オブジェクトの特異メソッドとしてhelloを定義する練習です。特異メソッドは対象のオブジェクトだけが利用可能なメソッドです。
#
class ExClass
end

e1 = ExClass.new
e2 = ExClass.new

def e2.hello
end

Judgement.call(e1, e2)`,
  "testCode": `require 'minitest'

class Judgement
  def self.call(e1, e2)
    @e1 = e1
    @e2 = e2
  end
end

class Judgement2
  def self.call(klass)
    @klass = klass
  end
end

class ExOver
  attr_accessor :result

  def initialize
    self.result = ''
  end

  def before
    result << 'before'
  end

  def hello
    result << 'hello'
  end

  def after
    result << 'after'
  end
end

class TestClassDefinitionFirstStep < Minitest::Test
def test_judgement
    e1 = Judgement.instance_variable_get(:@e1)
    e2 = Judgement.instance_variable_get(:@e2)
    assert e1.is_a?(ExClass)
    assert e2.is_a?(ExClass)
    refute e1.respond_to?(:hello)
    assert e2.respond_to?(:hello)
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
