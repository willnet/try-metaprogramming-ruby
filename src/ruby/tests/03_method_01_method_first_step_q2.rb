require 'minitest'

class TestMethodFirstStep < Minitest::Test
  def test_add_hi
    f2 = F2.new
    refute f2.respond_to?(:hi)
    f2.add_hi
    assert f2.respond_to?(:hi)
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
