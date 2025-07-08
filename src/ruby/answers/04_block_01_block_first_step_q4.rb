class MyClosure
  count = 0

  define_method :increment do
    count += 1
  end
end
