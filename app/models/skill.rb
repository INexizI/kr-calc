class Skill < ApplicationRecord
  belongs_to :char
  belongs_to :parent, optional: true, class_name: 'Skill'
end
