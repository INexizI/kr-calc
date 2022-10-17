class LinkExpiredJob < ApplicationJob
  queue_as :default

  def perform(link)
    link.destroy_expired
  end
end
