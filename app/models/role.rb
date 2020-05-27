class Role < ApplicationRecord
  mount_uploader :image, ImageUploader
  extend FriendlyId
  friendly_id :name, use: %i[slugged finders]

  has_many :chars
  has_many :gears
  has_many :stats, class_name: 'Stat'
end
