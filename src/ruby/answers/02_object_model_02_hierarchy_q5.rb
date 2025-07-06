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

# Q5. 問題の解説
#
# refinementsの練習問題です。
# refineしたメソッドの影響範囲はusingがクラス内であれば、そのusingしたクラス内でのみ、かつusing以降の行です。
module M1Refinements
  refine M1 do
    def name
      'Refined M1'
    end
  end
end

class C5
  include M1

  def another_name
    name
  end

  using M1Refinements

  def other_name
    name
  end
end