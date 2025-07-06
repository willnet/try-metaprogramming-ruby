module M1
  def name
    'M1'
  end
end

module M2
  def name
    'M2'
  end
end

module M3
  def name
    'M3'
  end
end

module M4
  def name
    'M4'
  end
end

# NOTE: これより上の行は変更しないこと

# Q4. 問題の解説
#
# privateメソッドとして定義していると、レシーバを明示的に指定したメソッド呼び出しができません。
# しかしこれには例外があり、レシーバがselfであれば問題ありません。
# この仕様はRuby2.7からのものであり、2.7未満はセッターメソッド(=が末尾についているもの)のみがselfをつけて呼び出し可能でした。
class C4
  def increment
    self.value ||= 0
    self.value += 1
    value.to_s
  end
  private

  attr_accessor :value
end