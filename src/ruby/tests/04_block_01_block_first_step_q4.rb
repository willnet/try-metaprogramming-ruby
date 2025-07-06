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
def test_my_closure
    m1 = MyClosure.new
    m2 = MyClosure.new
    assert_equal(1, m1.increment)
    assert_equal(2, m2.increment)
    assert_equal(3, m1.increment)
    MyClosure
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