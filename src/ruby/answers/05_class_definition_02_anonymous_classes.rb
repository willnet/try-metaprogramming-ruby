class ExClass
end

# Create anonymous class that inherits from ExClass and pass it to Judgement2.call
anonymous_class = Class.new(ExClass)
Judgement2.call(anonymous_class)
