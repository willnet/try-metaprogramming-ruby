// Hierarchy Q6
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q6",
  "title": "Hierarchy Q6",
  "title_en": "Hierarchy Q6",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q6)",
  "description_en": "A problem about Ruby's class hierarchy and module mechanisms. Learn about ancestor chains, method lookup, refinements, etc. (Q6)",
  "detailedDescription": `Q6.
次の動作をする C6 class を実装する
- M1Refinements は Q5 で実装したものをそのまま使う
- C6.new.name が 'Refined M1' を返すように C6 に name メソッドを実装する`,
  "detailedDescription_en": `Q6.
Implement C6 class that behaves as follows
- M1Refinements uses the same implementation from Q5
- Implement a name method in C6 so that C6.new.name returns 'Refined M1'`,
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

# M1 module definition (needed for refinements)
module M1
  def name
    'M1'
  end
end

# M1Refinements definition (needed for Q6)
module M1Refinements
  refine M1 do
    def name
      'Refined M1'
    end
  end
end

class TestHierarchy < Minitest::Test
def test_c6_name
    assert_equal "Refined M1", C6.new.name

    C6.include(Module.new do
      def name = "other"
    end)
    assert_equal "other", C6.new.name
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
