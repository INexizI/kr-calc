class Gear < ApplicationRecord
  belongs_to :char, optional: true
  belongs_to :role, optional: true
  belongs_to :stat, optional: true
  # has_many :stats, class_name: 'Stat'
end
