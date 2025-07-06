// Hierarchy Q1
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q1",
  "title": "Hierarchy Q1",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q1)",
  "detailedDescription": `Q1.
次の動作をする C1 class を実装する
- C1.ancestors.first(2) が [C1, M1] となる
- C1.new.name が 'C1' を返す`,
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

class C1
  def name
    'C1'
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

# Q1. 問題の解説
#
# M1をC1にincludeすると、継承ツリーはC1の次にM1が位置することになり、仕様を満たせます。
#
class C1
  include M1

  def name
    'C1'
  end
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c1_ancestors
    assert_equal [C1, M1], C1.ancestors.first(2)
  end

def test_c1_name
    assert_equal 'C1', C1.new.name
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
