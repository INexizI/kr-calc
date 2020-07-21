class Stat < ApplicationRecord
  belongs_to :role, optional: true
  # belongs_to :gear, optional: true
  has_many :gears

  def star_1
    @x = self.value.to_f
    self.value = (@x + @x / 100 * 10).ceil
  end

  def star_2
    (@x + @x / 100 * 25).ceil
  end

  def star_3
    (@x + @x / 100 * 45).ceil
  end

  def star_4
    (@x + @x / 100 *70).ceil
  end

  def star_5
    (@x + @x).ceil
  end
end
