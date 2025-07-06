class EvilMailbox
  def initialize(obj, str = nil)
    @obj = obj
    @obj.auth(str) if str

    define_singleton_method(:send_mail) do |to, body, &block|
      result = obj.send_mail(to, body + str.to_s)
      block.call(result) if block
      nil
    end
  end

  def receive_mail
    obj.receive_mail
  end

  private

  attr_reader :obj
end