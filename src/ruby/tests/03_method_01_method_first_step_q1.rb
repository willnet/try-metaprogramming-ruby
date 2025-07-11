require 'minitest'

class TestMethodFirstStep < Minitest::Test
  def test_hello
    assert_equal F1.new.hello, 'hello'
  end

  def test_world
    assert_equal F1.world, 'world'
  end

  def test_method_missing
    assert_equal F1.new.send(SecureRandom.alphanumeric), 'NoMethodError'
  end

  def test_respond_to
    assert F1.new.respond_to?(SecureRandom.alphanumeric)
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
