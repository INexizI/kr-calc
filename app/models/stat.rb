class Stat < ApplicationRecord
  belongs_to :role, optional: true
  # belongs_to :gear, optional: true
  has_many :gears

  def star_0
    self.value
  end
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

  def uw_0
    self.value
  end
  def uw_1
    @x = self.value.to_f
    self.value = (@x + @x / 100 * 10 - 1).ceil
  end
  def uw_2
    (@x + @x / 100 * 30 - 1.5).ceil
  end
  def uw_3
    (@x + @x / 100 * 60 - 1.5).ceil
  end
  def uw_4
    (@x + @x - 2.5).ceil
  end
  def uw_5
    (@x * 2 + @x / 2 - 2.5).ceil
  end

  def ut_0
    self.value
  end
  def ut_1
    @x = self.value.to_f
    self.value = (@x + @x / 100 * 10).ceil
  end
  def ut_2
    (@x + @x / 100 * 20).ceil
  end
  def ut_3
    (@x + @x / 100 * 30).ceil
  end
  def ut_4
    (@x + @x / 100 * 40).ceil
  end
  def ut_5
    (@x + @x / 2).ceil
  end
end
