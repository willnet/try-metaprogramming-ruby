require 'minitest'
require 'securerandom'

class TestDefine < Minitest::Test
  begin
    class A3
      include OriginalAccessor
      my_attr_accessor :hoge
      my_attr_accessor :fuga
    end
  rescue
  end

  def test_answer_a3_define
    assert_equal true, A3.methods.include?(:my_attr_accessor)
  end

  def test_answer_a3_string
    instance = A3.new
    instance.hoge = "1"

    assert_equal false, instance.methods.include?(:hoge?)
    assert_equal "1", instance.hoge
  end

  def test_answer_a3_number
    instance = A3.new
    instance.hoge = 1

    assert_equal false, instance.methods.include?(:hoge?)
    assert_equal 1, instance.hoge
  end

  def test_answer_a3_array
    instance = A3.new
    instance.hoge = [1, 2]

    assert_equal false, instance.methods.include?(:hoge?)
    assert_equal [1, 2], instance.hoge
  end

  def test_answer_a3_boolean_true
    instance = A3.new
    instance.hoge = true
    assert_equal true, instance.methods.include?(:hoge?)
    assert_equal true, instance.hoge?
  end

  def test_answer_a3_boolean_false
    instance = A3.new
    instance.hoge = false
    assert_equal true, instance.methods.include?(:hoge?)
    assert_equal false, instance.hoge?
  end

  def test_answer_a3_multiple
    instance = A3.new
    instance.hoge = "hoge"
    instance.fuga = "fuga"
    assert_equal "hoge", instance.hoge
    assert_equal "fuga", instance.fuga
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