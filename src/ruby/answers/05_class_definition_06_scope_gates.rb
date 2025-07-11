class MyGreeting
end

toplevellocal = 'hi'

MyGreeting.class_eval do
  define_method(:say) do
    toplevellocal
  end
end
