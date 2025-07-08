require 'minitest'

class TestMethodFirstStep < Minitest::Test
  def test_add_hi
    f2 = F2.new

    # hi method should not exist initially
    assert_raises(NoMethodError) { f2.hi }

    # After calling add_hi, hi method should exist
    f2.add_hi
    f2.hi # Should not raise an error
    assert true # If we reach here, the test passes
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
