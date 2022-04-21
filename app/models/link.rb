class Link < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: %i[slugged finders]

  validates :text, presence: true
  validates :title, presence: true

  after_initialize do
    r = [('a'..'z'), ('A'..'Z'), (0..9)].map(&:to_a).flatten
    sl = (0..5).map { r[rand(r.length)] }.join
    self.title ||= sl

    self.date_expired ||= 1.month.from_now
  end

  after_save_commit do
    LinkExpiredJob.set(wait_until: date_expired).perform_later(self)
  end

  def destroy_expired
    self.destroy
  end
end
