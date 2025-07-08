require 'minitest'

class TestHierarchy < Minitest::Test
  def test_c4_increment
    c4 = C4.new
    assert_equal '1', c4.increment
    assert_equal '2', c4.increment
    assert_equal '3', c4.increment
  end

  def test_c4_value_called
    c4 = C4.new
    c4.singleton_class.class_eval do
      private

      def value=(x)
        @called_setter = true
        @value = x
      end

      def value
        @called_getter = true
        return unless defined?(@value)

        @value
      end
    end
    c4.instance_variable_set(:"@called_setter", nil)
    c4.instance_variable_set(:"@called_getter", nil)

    assert_equal '1', c4.increment
    assert c4.instance_variable_get(:"@called_setter")
    assert c4.instance_variable_get(:"@called_getter")
  end

  def test_c4_value_methods
    assert C4.private_instance_methods.include?(:value)
    assert C4.private_instance_methods.include?(:value=)
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
