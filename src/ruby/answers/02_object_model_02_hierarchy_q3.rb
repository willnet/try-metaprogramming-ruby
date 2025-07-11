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

class MySuperClass
  include M4
end

class C3 < MySuperClass
  prepend M1
  include M3
  include M2

  def name
    'C3'
  end
end
