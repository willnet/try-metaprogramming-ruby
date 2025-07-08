module SimpleMock
  def self.mock(obj)
    obj.extend(SimpleMock)
    obj
  end

  def self.new
    obj = Object.new
    mock(obj)
  end

  def expects(name, value)
    define_singleton_method(name) do
      @counter[name] += 1 if @counter&.key?(name)
      value
    end
    @expects ||= []
    @expects.push(name.to_sym)
  end

  def watch(name)
    (@counter ||= {})[name] = 0

    return if @expects&.include?(name.to_sym)

    define_singleton_method(name) do
      @counter[name] += 1
    end
  end

  def called_times(name)
    @counter[name]
  end
end
