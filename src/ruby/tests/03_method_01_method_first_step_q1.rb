require 'minitest'

class TestMethodFirstStep < Minitest::Test
def test_hello
    assert_equal F1.new.hello, 'hello'
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