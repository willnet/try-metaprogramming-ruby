require 'minitest'

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
end
