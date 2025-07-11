require 'minitest'
require 'securerandom'

class TestDefine < Minitest::Test
  def test_answer_a1
    assert_equal '//', A1.new.send('//'.to_sym)
  end

  def test_answer_a1_define
    assert_equal true, A1.new.methods.include?("//".to_sym)
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
