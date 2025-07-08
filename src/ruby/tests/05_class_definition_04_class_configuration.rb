require 'minitest'

class TestClassConfiguration < Minitest::Test
  def test_class_level_configuration
    ExConfig.config = 'hello'
    assert_equal 'hello', ExConfig.config
  end

  def test_instance_can_read_class_config
    ExConfig.config = 'hello'
    ex = ExConfig.new
    assert_equal 'hello', ex.config
  end

  def test_instance_can_modify_class_config
    ex = ExConfig.new
    ex.config = 'world'
    assert_equal 'world', ExConfig.config
  end

  def test_configuration_shared_across_instances
    ExConfig.config = 'initial'

    ex1 = ExConfig.new
    ex2 = ExConfig.new

    assert_equal 'initial', ex1.config
    assert_equal 'initial', ex2.config

    ex1.config = 'changed'
    assert_equal 'changed', ex2.config
    assert_equal 'changed', ExConfig.config
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
