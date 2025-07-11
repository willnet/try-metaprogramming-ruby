module M1
  def name
    'M1'
  end
end

class C1
  include M1

  def name
    'C1'
  end
end
