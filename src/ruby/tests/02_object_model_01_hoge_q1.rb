require 'minitest'

class TestHoge < Minitest::Test
  def test_hoge_const
    assert_equal "hoge", Hoge::Hoge
  end

  def test_hogehoge_method_exists_in_hoge_class
    assert Hoge.instance_methods(false).include?(:hogehoge)
  end

  def test_hogehoge_method_returns_hoge
    assert_equal "hoge", Hoge.new.hogehoge
  end

  def test_hoge_super_class_is_string
    assert_equal String, Hoge.superclass
  end

  def test_ask_hoge_myself_true
    assert Hoge.new("hoge").hoge?
  end

  def test_ask_hoge_myself_false
    refute Hoge.new("foo").hoge?
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
