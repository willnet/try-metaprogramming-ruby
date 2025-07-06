class F1
  define_method :hello do
    'hello'
  end

  define_singleton_method :world do
    'world'
  end

  def method_missing(*args)
    'NoMethodError'
  end

  def respond_to_missing?(*args)
    true
  end
end