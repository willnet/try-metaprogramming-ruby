require 'minitest'

class TestHoge < Minitest::Test
def test_hoge_in_integer
    assert_equal "hoge", 1.hoge
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