require 'minitest'
require 'minitest/mock'

class TestTryOver03Q1 < Minitest::Test
def test_q1_called_run_test
    a1 = TryOver3::A1.new
    mock = Minitest::Mock.new
    a1.stub(:run_test, mock) do
      a1.test_hoge
    end
    assert mock.verify
  end

def test_q1_run_raise_error
    assert_raises(NoMethodError) { TryOver3::A1.new.testhoge }
  end

def test_q1_methods_not_included_test
    assert_equal false, TryOver3::A1.instance_methods(false).any? { |method_name| method_name.to_s.start_with?("test_") }
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