class C4
  def increment
    self.value ||= 0
    self.value += 1
    value.to_s
  end

  private

  attr_accessor :value
end
