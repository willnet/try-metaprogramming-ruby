// Hierarchy Q2
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q2",
  "title": "Hierarchy Q2",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q2)",
  "detailedDescription": `Q2.
次の動作をする C2 class を実装する
- C2.ancestors.first(2) が [M1, C2] となる
- C2.new.name が 'M1' を返す`,
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

class C2
  def name
    'C2'
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

# Q2. 問題の解説
#
# M1をC2にprependすると、継承ツリーはM2の次にC2が位置することになり、仕様を満たせます。
#
class C2
  prepend M1

  def name
    'C2'
  end
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c2_ancestors
    assert_equal [M1, C2], C2.ancestors.first(2)
  end

def test_c2_name
    assert_equal 'M1', C2.new.name
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
