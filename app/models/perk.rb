class Perk < ApplicationRecord
  # acts_as_taggable # Alias for acts_as_taggable_on :tags
  # acts_as_taggable_on :tags

  validates :name, presence: true, length: { minimum: 3 }
  validates :description, presence: true, length: { maximum: 3000 }
  validates :tier, presence: true
  validates :sequence, presence: true
  validates :perk_type, presence: true
end
