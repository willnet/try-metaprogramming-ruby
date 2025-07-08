# The ExOver class will be defined by the test with hello, before, and after methods
# We need to modify the hello method to call before and after

module HelloWrapper
  def hello
    before
    super
    after
  end
end

class ExOver
  prepend HelloWrapper
end
