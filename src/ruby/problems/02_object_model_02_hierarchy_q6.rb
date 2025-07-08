module M1
  def name
    'M1'
  end
end

module M1Refinements
end

class C6
  include M1
  using M1Refinements
end
