// Hierarchy Q5
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q5",
  "title": "Hierarchy Q5",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q5)",
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

# Q5.
# 次の動作をする M1Refinements module を実装する
# - M1Refinements は M1 の name インスタンスメソッドをリファインし,
#   リファインされた name メソッドは "Refined M1" を返す
# - C5.new.another_name が文字列 "M1" を返す
# - C5.new.other_name が文字列 "Refined M1" を返す
module M1Refinements
end

class C5
  include M1

  def another_name
    name
  end

  using M1Refinements

  def other_name
    name
  end
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

# Q5. 問題の解説
#
# refinementsの練習問題です。
# refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。
module M1Refinements
  refine M1 do
    def name
      'Refined M1'
    end
  end
end

class C5
  include M1

  def another_name
    name
  end

  using M1Refinements

  def other_name
    name
  end
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c5_another_name
    assert_equal "M1", C5.new.another_name
  end

def test_c5_other_name
    assert_equal "Refined M1", C5.new.other_name
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
