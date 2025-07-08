module SimpleModel
  def self.included(klass)
    klass.attr_accessor :_histories, :_initial
    klass.extend(ClassMethods)
  end

  def initialize(args = {})
    self._initial = args
    self._histories = {}
    args.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def restore!
    self._histories = {}
    _initial.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def changed?
    !_histories.empty?
  end

  module ClassMethods
    def attr_accessor(*syms)
      syms.each { |sym| attr_reader sym }
      syms.each do |sym|
        define_method "#{sym}=" do |value|
          (_histories[sym] ||= []).push(value)
          instance_variable_set("@#{sym}", value)
        end

        define_method "#{sym}_changed?" do
          !!_histories[sym]
        end
      end
    end
  end
end
