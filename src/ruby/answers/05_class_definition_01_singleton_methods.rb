class ExClass
end

e1 = ExClass.new
e2 = ExClass.new

def e2.hello
  'Hello from e2!'
end

Judgement.call(e1, e2)
