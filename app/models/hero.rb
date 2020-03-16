class Hero < ApplicationRecord
  mount_uploader :avatar, ImageUploader
  mount_uploader :background, ImageUploader
end
