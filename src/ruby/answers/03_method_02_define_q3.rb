module OriginalAccessor
  def self.included(base)
    base.define_singleton_method(:my_attr_accessor) do |attr|
      base.define_method attr do
        @my_attr_accessor&.fetch(attr) { nil }
      end

      base.define_method "#{attr}=" do |value|
        (@my_attr_accessor ||= {})[attr] = value

        if value.is_a?(TrueClass) || value.is_a?(FalseClass)
          define_singleton_method "#{attr}?" do
            !!value
          end
        end
      end
    end
  end
end
