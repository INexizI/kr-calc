class Char < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i[slugged finders]

  belongs_to :role
  has_many :gears
  has_many :skills

  default_scope {order('name ASC')}
end
