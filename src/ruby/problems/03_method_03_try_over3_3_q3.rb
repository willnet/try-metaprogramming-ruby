TryOver3 = Module.new

module TryOver3::OriginalAccessor2
  def self.included(mod)
    mod.define_singleton_method :my_attr_accessor do |name|
      define_method name do
        @attr
      end

      define_method "#{name}=" do |value|
        if [true, false].include?(value) && !respond_to?("#{name}?")
          self.class.define_method "#{name}?" do
            @attr == true
          end
        end
        @attr = value
      end
    end
  end
end
