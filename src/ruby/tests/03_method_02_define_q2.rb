require 'minitest'
require 'securerandom'

class TestDefine < Minitest::Test
  def test_answer_a2
    instance = A2.new(["hoge", "fuga"])

    assert_equal true, instance.methods.include?(:dev_team)
    assert_equal "SmartHR Dev Team", instance.hoge_hoge(nil)
    assert_equal "hoge_hogehoge_hoge", instance.hoge_hoge(2)
    assert_equal "hoge_fugahoge_fugahoge_fuga", instance.hoge_fuga(3)

    another_instance = A2.new([])
    assert_equal false, another_instance.methods.include?(:hoge_hoge)
    assert_equal false, another_instance.methods.include?(:hoge_fuga)
  end

  def test_answer_a2_number
    instance = A2.new([1, 2])

    assert_equal true, instance.methods.include?(:dev_team)
    assert_equal "SmartHR Dev Team", instance.hoge_1(nil)
    assert_equal "hoge_1hoge_1", instance.hoge_1(2)
    assert_equal "hoge_2hoge_2hoge_2", instance.hoge_2(3)

    another_instance = A2.new([])
    assert_equal false, another_instance.methods.include?(:hoge_1)
    assert_equal false, another_instance.methods.include?(:hoge_2)
  end

  def test_answer_a2_random_name
    value_one = SecureRandom.hex
    value_two = SecureRandom.hex

    instance = A2.new([value_one, value_two])
    assert_equal true, instance.methods.include?(:dev_team)
    assert_equal "SmartHR Dev Team", instance.send("hoge_#{value_one}".to_sym, nil)
    assert_equal "hoge_#{value_one}hoge_#{value_one}", instance.send("hoge_#{value_one}".to_sym, 2)
    assert_equal "hoge_#{value_two}hoge_#{value_two}hoge_#{value_two}", instance.send("hoge_#{value_two}".to_sym, 3)

    another_instance = A2.new([])
    assert_equal false, another_instance.methods.include?("hoge_#{value_one}".to_sym)
    assert_equal false, another_instance.methods.include?("hoge_#{value_two}".to_sym)
  end

  def test_answer_a2_called_dev_team
    instance = A2.new([1])

    @called_dev_team = false
    trace = TracePoint.new(:call) do |tp|
      @called_dev_team = tp.event == :call && tp.method_id == :dev_team unless @called_dev_team
    end
    trace.enable
    instance.hoge_1(nil)
    trace.disable

    assert_equal true, @called_dev_team
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