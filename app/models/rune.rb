class Rune < ApplicationRecord
  validates :name, length: { minimum: 3 }, presence: true
  validates :value, presence: true
  validates :type_gear, presence: true
  validates :tier, presence: true
end
