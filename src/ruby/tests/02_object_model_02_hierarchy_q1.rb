require 'minitest'

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
end
