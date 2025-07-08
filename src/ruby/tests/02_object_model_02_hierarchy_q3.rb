require 'minitest'

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
end
