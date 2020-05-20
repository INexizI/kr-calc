class Calc < ApplicationRecord
  def self.sum(a, b)
    a.to_i + b.to_i
  end

  def self.subtr(a, b)
    a.to_i - b.to_i
  end

  def self.multiple(a, b)
    a.to_i * b.to_i
  end

  def self.divide(a, b)
    a.to_i / b.to_i
  end
end
