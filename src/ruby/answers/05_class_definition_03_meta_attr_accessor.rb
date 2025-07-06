class MetaClass
  def self.meta_attr_accessor(name)
    define_method("meta_#{name}") do
      instance_variable_get("@meta_#{name}")
    end
    
    define_method("meta_#{name}=") do |value|
      instance_variable_set("@meta_#{name}", "meta #{value}")
    end
  end
  
  meta_attr_accessor :hello
end