class Hoge < String
  Hoge = 'hoge'

  def hogehoge
    'hoge'
  end

  def hoge?
    self == 'hoge'
  end
end

class String
  def hoge
    Hoge.new(self)
  end
end
