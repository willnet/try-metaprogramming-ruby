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

module M1Refinements
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