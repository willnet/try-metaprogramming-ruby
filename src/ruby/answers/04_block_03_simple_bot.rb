class SimpleBot
  class << self
    def respond(keyword, &block)
      @respond ||= {}
      @respond[keyword] = block
    end

    def setting(key, value)
      @settings ||= {}
      @settings[key] = value
    end

    def settings
      obj = Object.new

      @settings&.each do |key, value|
        obj.define_singleton_method(key) do
          value
        end
      end
      obj
    end
  end

  def ask(keyword)
    block = self.class.instance_variable_get(:@respond)[keyword]
    block.call if block
  end
end
