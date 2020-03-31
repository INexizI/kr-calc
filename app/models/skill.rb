class Skill < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :char
  belongs_to :parent, optional: true, class_name: 'Skill'
end
