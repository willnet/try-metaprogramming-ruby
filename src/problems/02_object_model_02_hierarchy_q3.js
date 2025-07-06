// Hierarchy Q3
export const problem = {
  "section": "02_object_model",
  "id": "02_hierarchy_q3",
  "title": "Hierarchy Q3",
  "description": "Rubyのクラス階層とモジュールの仕組みについての問題。祖先チェーン、メソッド探索、refinementなどを学びます。 (Q3)",
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

# Q3.
# 次の動作をする C3 class, MySuperClass class を実装する
# - C3.ancestors.first(6) が [M1, C3, M2, M3, MySuperClass, M4] となる
# - C3.new.name が 'M1' を返す
class C3
  def name
    'C3'
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

# Q3. 問題の解説
#
# モジュールを複数includeしたり、スーパークラスを明示的に定義したときの
# 継承ツリーがどうなるかの理解を問う問題です
#
class MySuperClass
  include M4
end

class C3 < MySuperClass
  prepend M1
  include M3
  include M2

  def name
    'C3'
  end
end`,
  "testCode": `require 'minitest'

class TestHierarchy < Minitest::Test
def test_c3_ancestors
    assert_equal [M1, C3, M2, M3, MySuperClass, M4], C3.ancestors.first(6)
  end

def test_c3_name
    assert_equal 'M1', C3.new.name
  end

def test_c3_super_class
    assert MySuperClass.kind_of?(Class)
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
