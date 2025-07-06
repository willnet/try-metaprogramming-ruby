class ExConfig
  def self.config=(value)
    @config = value
  end
  
  def self.config
    @config
  end
  
  def config
    self.class.config
  end
  
  def config=(value)
    self.class.config = value
  end
end