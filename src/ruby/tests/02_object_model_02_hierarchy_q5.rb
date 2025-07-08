require 'minitest'

class TestHierarchy < Minitest::Test
  def test_c5_another_name
    assert_equal 'M1', C5.new.another_name
  end

  def test_c5_other_name
    assert_equal 'Refined M1', C5.new.other_name
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
