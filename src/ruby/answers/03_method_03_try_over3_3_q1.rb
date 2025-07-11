TryOver3 = Module.new

class TryOver3::A1
  def run_test; end

  def method_missing(name, *)
    if name.to_s.start_with?('test_')
      run_test
    else
      super
    end
  end

  def respond_to_missing?(name, _)
    name.to_s.start_with?('test_')
  end
end
