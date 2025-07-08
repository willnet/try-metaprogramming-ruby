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

# Q2. 問題の解説
#
# M1をC2にprependすると、継承ツリーはM2の次にC2が位置することになり、仕様を満たせます。
#
class C2
  prepend M1

  def name
    'C2'
  end
end
