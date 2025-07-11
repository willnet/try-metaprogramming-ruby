require 'minitest'

class TestTryOver03Q3 < Minitest::Test
  def test_q3_original_accessor_boolean_method
    instance = orignal_accessor_included_instance
    instance.hoge = true
    assert_equal(true, instance.hoge?)
    instance.hoge = "hoge"
    assert_raises(NoMethodError) { instance.hoge? }
    refute_includes(instance.methods, :hoge?)
  end

  def test_q3_original_accessor_boolean_method_reverse
    instance = orignal_accessor_included_instance
    instance.hoge = "hoge"
    assert_raises(NoMethodError) { instance.hoge? }
    refute_includes(instance.methods, :hoge?)
    instance.hoge = true
    assert_equal(true, instance.hoge?)
  end

  def test_q3_original_accessor_false_value
    instance = orignal_accessor_included_instance
    instance.hoge = false
    assert_equal(false, instance.hoge?)
    instance.hoge = 0
    assert_raises(NoMethodError) { instance.hoge? }
    refute_includes(instance.methods, :hoge?)
  end

  private

  def orignal_accessor_included_instance
    Class.new do
      include TryOver3::OriginalAccessor2
      my_attr_accessor :hoge
    end.new
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