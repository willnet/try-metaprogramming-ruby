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
