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

# Q1. 問題の解説
#
# M1をC1にincludeすると、継承ツリーはC1の次にM1が位置することになり、仕様を満たせます。
#
class C1
  include M1

  def name
    'C1'
  end
end