TryOver3 = Module.new

class TryOver3::A4
  def self.const_missing(const)
    if @consts.include?(const)
      obj = Object.new
      obj.define_singleton_method(:run) { "run #{const}" }
      obj
    else
      super
    end
  end

  def self.runners=(consts)
    @consts = consts
  end
end
