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

# Q6. 問題の解説
#
# Q5の解説でも書いたように、refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。
# なので、問題として用意したコードのままだとなにもrefineされず、もともとのC6#nameは'M1'を返します。
# using以降の行でM1#nameを呼び出すC6#nameを定義するとrefineした実装が呼び出されます。
#
class C6
  include M1
  using M1Refinements

  def name
    super
  end
end