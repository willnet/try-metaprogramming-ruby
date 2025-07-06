require 'minitest'

MY_LAMBDA = -> { 3 }

class AcceptBlock
  class << self
    attr_accessor :result
  end

  def self.call(&block)
    @result = block == MY_LAMBDA
  end
end

class TestBlockFirstStep < Minitest::Test
def test_my_block
    assert_equal(MY_LAMBDA, MyBlock.new.block_to_proc(&MY_LAMBDA))
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