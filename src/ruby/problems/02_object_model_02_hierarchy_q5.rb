module M1
  def name
    'M1'
  end
end

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
