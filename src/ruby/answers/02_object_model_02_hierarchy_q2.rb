module M1
  def name
    'M1'
  end
end

class C2
  prepend M1

  def name
    'C2'
  end
end
