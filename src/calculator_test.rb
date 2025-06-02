require 'minitest'

class CalculatorTest < Minitest::Test
  def setup
    @calc = Calculator.new
  end

  def test_add
    assert_equal 5, @calc.add(2, 3)
    assert_equal 0, @calc.add(-2, 2)
  end

  def test_subtract
    assert_equal 2, @calc.subtract(5, 3)
    assert_equal -5, @calc.subtract(0, 5)
  end

  def test_multiply
    assert_equal 6, @calc.multiply(2, 3)
    assert_equal 0, @calc.multiply(0, 5)
  end

  def test_divide
    assert_equal 2, @calc.divide(6, 3)
    assert_equal 0, @calc.divide(0, 5)
    assert_raises(ZeroDivisionError) { @calc.divide(5, 0) }
  end
end

# 明示的にテストを実行するためのコード
# このコードはJavaScriptから呼び出されるときに実行される
def run_tests
  parallel_executor = Object.new
  def parallel_executor.shutdown
    # nothing
  end
  Minitest.parallel_executor = parallel_executor
  Minitest.run
end
