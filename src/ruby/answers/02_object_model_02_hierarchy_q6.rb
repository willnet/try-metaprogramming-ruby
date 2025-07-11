module M1
  def name
    'M1'
  end
end

module M1Refinements
  refine M1 do
    def name
      'Refined M1'
    end
  end
end

class C6
  include M1
  using M1Refinements

  def name
    super
  end
end
