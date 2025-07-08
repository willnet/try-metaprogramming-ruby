class MyGreeting
  # Do not edit this class
end

toplevellocal = 'hi'
# Edit from this line below to implement MyGreeting#say that returns toplevellocal

MyGreeting.class_eval do
  define_method(:say) do
    toplevellocal
  end
end
