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
def test_accept_block
    assert AcceptBlock.result
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