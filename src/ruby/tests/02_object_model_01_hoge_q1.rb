require 'minitest'

class TestHoge < Minitest::Test
def test_hoge_in_string
    assert_equal "hoge","hoge".hoge
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