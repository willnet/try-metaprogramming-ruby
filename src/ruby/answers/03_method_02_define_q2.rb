class A2
  def initialize(ary)
    ary.each do |name|
      method_name = "hoge_#{name}"

      define_singleton_method method_name do |times|
        if times.nil?
          dev_team
        else
          method_name * times
        end
      end
    end
  end

  def dev_team
    'SmartHR Dev Team'
  end
end
