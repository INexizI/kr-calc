class Role < ApplicationRecord
    mount_uploader :image, ImageUploader
    extend FriendlyId
    friendly_id :name, use: %i[slugged finders]
end
