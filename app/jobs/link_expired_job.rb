class LinkExpiredJob < ApplicationJob
  queue_as :default

  def perform(link)
    if link.exists?
      if DateTime.current.to_date <= link.date_expired
        link.destroy_expired
      end
    end
  end
end
