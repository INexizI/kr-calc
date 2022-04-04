# frozen_string_literal: true

# redis = Redis.new(url:  Rails.application.secrets.REDIS_URL,
#                   port: Rails.application.secrets.REDIS_PORT,
#                   db:   Rails.application.secrets.REDIS_DB)
redis = Redis.new(url:  ENV['REDIS_URL'],
                  port: ENV['REDIS_PORT'],
                  db:   ENV['REDIS_DB'])
