class Role < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i[slugged finders]

  has_many :chars
  has_many :gears
  has_many :stats, class_name: 'Stat'

  validates :name, length: { minimum: 3 }, presence: true

  scope :chars_by_name, -> { chars.order(name: :asc) }
end
