class Gear < ApplicationRecord
  belongs_to :char, optional: true
  belongs_to :role, optional: true
  belongs_to :stat, optional: true
  # has_many :stats, class_name: 'Stat'

  validates :name, length: { minimum: 3 }
  validates :description, length: { maximum: 3000 }
  validate :tier
  validate :set
  validate :gear_type
  validate :gear_skill
end
