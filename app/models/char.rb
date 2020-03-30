class Char < ApplicationRecord
  mount_uploader :icon, ImageUploader
  mount_uploader :avatar, ImageUploader
  mount_uploader :background, ImageUploader

  extend FriendlyId
  friendly_id :name, use: %i[slugged finders]

  belongs_to :role
  has_many :skills
end
