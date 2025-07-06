require 'minitest'

class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

class TestBlockFirstStep < Minitest::Test
def test_my_math
    assert_equal 4, MyMath.new.two_times { 2 }
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