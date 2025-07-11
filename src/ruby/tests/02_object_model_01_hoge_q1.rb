require 'minitest'

class TestHoge < Minitest::Test

  def test_hoge_in_string
    assert_equal "hoge","hoge".hoge
  end

  def test_hoge_in_integer
    assert_equal "hoge", 1.hoge
  end

  def test_hoge_in_numeric
    assert_equal "hoge", (1.1).hoge
  end

  def test_hoge_in_class
    assert_equal "hoge", Class.hoge
  end

  def test_hoge_in_hash
    assert_equal "hoge", ({hoge: :foo}).hoge
  end

  def test_hoge_in_true_class
    assert_equal "hoge", true.hoge
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
