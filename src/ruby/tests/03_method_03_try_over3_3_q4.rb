require 'minitest'
require 'minitest/mock'

class TestTryOver03Q1 < Minitest::Test
  def test_q4_call_class
    TryOver3::A4.runners = [:Hoge]
    assert_equal 'run Hoge', TryOver3::A4::Hoge.run
  end

  def test_q4_raise_error_when_called_not_runner_class
    TryOver3::A4.runners = [:Hoge]
    assert_raises(NameError) { TryOver3::A4::Foo }
  end

  def test_q4_not_exists_runner_class
    TryOver3::A4.runners = [:Hoge]
    refute_includes(TryOver3::A4.constants, :Hoge)
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
