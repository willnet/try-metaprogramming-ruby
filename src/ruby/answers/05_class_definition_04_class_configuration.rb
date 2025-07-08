class ExConfig
  class << self
    attr_writer :config
  end

  class << self
    attr_reader :config
  end

  def config
    self.class.config
  end

  def config=(value)
    self.class.config = value
  end
end
