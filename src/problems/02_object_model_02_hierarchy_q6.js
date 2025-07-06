// Hierarchy Q6
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q6",
  "title": "Hierarchy Q6",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q6)",
  "problemCode": `module M1
  def name
    'M1'
  end
end

module M2
  def name
    'M2'
  end
end

module M3
  def name
    'M3'
  end
end

module M4
  def name
    'M4'
  end
end

# NOTE: これより上の行は変更しないこと

# Q6.
# 次の動作をする C6 class を実装する
# - M1Refinements は Q5 で実装したものをそのまま使う
# - C6.new.name が 'Refined M1' を返すように C6 に name メソッドを実装する
class C6
  include M1
  using M1Refinements
end`,
  "answerCode": `module M1
  def name
    'M1'
  end
end

module M2
  def name
    'M2'
  end
end

module M3
  def name
    'M3'
  end
end

module M4
  def name
    'M4'
  end
end

# NOTE: これより上の行は変更しないこと

# Q6. 問題の解説
#
# Q5の解説でも書いたように、refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。
# なので、問題として用意したコードのままだとなにもrefineされず、もともとのC6#nameは'M1'を返します。
# using以降の行でM1#nameを呼び出すC6#nameを定義するとrefineした実装が呼び出されます。
#
class C6
  include M1
  using M1Refinements

  def name
    super
  end
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c6_name
    assert_equal "Refined M1", C6.new.name

    C6.include(Module.new do
      def name = "other"
    end)
    assert_equal "other", C6.new.name
  end
end

# 明示的にテストを実行するためのコード
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
