# frozen_string_literal: true

Redis.current = Redis.new(url:  Rails.application.secrets.REDIS_URL,
                          port: Rails.application.secrets.REDIS_PORT,
                          db:   Rails.application.secrets.REDIS_DB)
