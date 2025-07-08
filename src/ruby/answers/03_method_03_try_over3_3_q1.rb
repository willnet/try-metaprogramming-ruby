TryOver3 = Module.new

# Q1. 問題の解説
#
# method_missingを利用してゴーストメソッドを作る問題です。
# respond_to_missing?はなくてもテストはパスしますが、method_missingを作るときにはセットで
# 定義しておくのがお作法なので回答例にはrespond_to_missing?も定義しています。
#
class TryOver3::A1
  def run_test; end

  def method_missing(name, *)
    if name.to_s.start_with?('test_')
      run_test
    else
      super
    end
  end

  def respond_to_missing?(name, _)
    name.to_s.start_with?('test_')
  end
end
