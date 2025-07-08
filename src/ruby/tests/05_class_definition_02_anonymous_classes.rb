require 'minitest'

class Judgement2
  def self.call(klass)
    @klass = klass
  end

  class << self
    attr_reader :klass
  end
end

class TestAnonymousClasses < Minitest::Test
  def test_anonymous_class_inheritance
    klass = Judgement2.klass
    assert klass.is_a?(Class)
    assert klass < ExClass
    assert_nil klass.name # Anonymous classes have no name
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
