class Link < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :text, presence: true
  validates :title, presence: true

  def title
    r = [('a'..'z'), ('A'..'Z'), (0..9)].map(&:to_a).flatten
    sl = (0..5).map { r[rand(r.length)] }.join
    self.title = sl
  end
end
