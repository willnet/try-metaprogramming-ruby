require 'minitest'

class Judgement
  def self.call(e1, e2)
    @e1 = e1
    @e2 = e2
  end
end

class TestSingletonMethods < Minitest::Test
  def test_singleton_method_only_on_e2
    e1 = Judgement.instance_variable_get(:@e1)
    e2 = Judgement.instance_variable_get(:@e2)
    assert e1.is_a?(ExClass)
    assert e2.is_a?(ExClass)
    refute e1.respond_to?(:hello)
    assert e2.respond_to?(:hello)
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
