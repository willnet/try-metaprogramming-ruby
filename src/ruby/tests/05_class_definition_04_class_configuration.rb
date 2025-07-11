require 'minitest'

class TestClassConfiguration < Minitest::Test
  def test_exconfig
    ExConfig.config = 'hello'
    assert_equal 'hello', ExConfig.config
    ex = ExConfig.new
    assert_equal 'hello', ex.config
    ex.config = 'world'
    assert_equal 'world', ExConfig.config
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
