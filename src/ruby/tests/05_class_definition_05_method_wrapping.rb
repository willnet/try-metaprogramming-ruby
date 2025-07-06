require 'minitest'

class ExOver
  attr_accessor :result

  def initialize
    self.result = ''
  end

  def before
    result << 'before'
  end

  def hello
    result << 'hello'
  end

  def after
    result << 'after'
  end
end

class TestMethodWrapping < Minitest::Test
  def test_method_wrapping_execution_order
    ex = ExOver.new
    ex.hello
    assert_equal 'beforehelloafter', ex.result
  end
  
  def test_method_wrapping_multiple_calls
    ex = ExOver.new
    ex.hello
    ex.hello
    assert_equal 'beforehelloafterbeforehelloafter', ex.result
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