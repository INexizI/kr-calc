class Role < ApplicationRecord
    mount_uploader :image, ImageUploader
end
