require 'minitest'

class TestScopeGates < Minitest::Test
  def test_my_greeting_say_returns_toplevel_variable
    greeting = MyGreeting.new
    assert_equal 'hi', greeting.say
  end

  def test_my_greeting_responds_to_say
    greeting = MyGreeting.new
    assert greeting.respond_to?(:say)
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
