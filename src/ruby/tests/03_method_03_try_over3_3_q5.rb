require 'minitest'

class TestTryOver03Q5 < Minitest::Test
  def test_q5_task_helper_call_method
    assert_equal("foo", TryOver3::A5Task.foo)
  end

  def test_q5_task_helper_not_exists_class
    refute_includes TryOver3::A5Task.constants, :Foo
  end

  def test_q5_task_helper_call_class
    assert_equal("foo", TryOver3::A5Task::Foo.run)
  end

  def test_q5_task_helper_call_class_with_warn
    original_stderr = $stderr
    $stderr = StringIO.new
    
    TryOver3::A5Task::Foo.run
    warning_output = $stderr.string
    
    assert_match "Warning: TryOver3::A5Task::Foo.run is deprecated", warning_output
  ensure
    $stderr = original_stderr
  end

  def test_q5_error_when_called_not_defined_task_class
    assert_raises(NameError) { TryOver3::A5Task::Bar.run }
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