TryOver3 = Module.new

# Q4. 問題の解説
#
# const_missingを利用して、runners=で定義した定数を参照したときにrunメソッドを持つオブジェクトを返すことで
# 仕様を満たしています。回答例ではObject.newでオブジェクトを生成しましたが、runメソッドを持つオブジェクトであれば
# どんなクラスのインスタンスでもOKです。
#
class TryOver3::A4
  def self.const_missing(const)
    if @consts.include?(const)
      obj = Object.new
      obj.define_singleton_method(:run) { "run #{const}" }
      obj
    else
      super
    end
  end

  def self.runners=(consts)
    @consts = consts
  end
end
