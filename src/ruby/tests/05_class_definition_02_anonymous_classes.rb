require 'minitest'

class Judgement2
  def self.call(klass)
    @klass = klass
  end
end

class TestAnonymousClasses < Minitest::Test
  def test_anonymous_class_inheritance
    klass = Judgement2.instance_variable_get(:@klass)
    assert klass.name.nil?
    assert klass.superclass == ExClass
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
