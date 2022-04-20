class Char < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i[slugged finders]

  belongs_to :role
  has_many :gears

  validates :name, length: { minimum: 3 }, presence: true
  validates :description, length: { maximum: 2000 }, presence: true
  validates :type_dmg, presence: true
  validates :position, presence: true

  default_scope { order('name ASC') }
end
