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
  def test_exover
    exover = ExOver.new
    assert_equal 'beforehelloafter', exover.hello
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
