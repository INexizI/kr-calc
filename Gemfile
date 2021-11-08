source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
gem 'pg'
gem 'puma'
gem 'bootsnap', require: false
gem 'sass-rails'

gem 'webpacker'
gem 'jbuilder'
gem 'json'
gem 'redis'
gem 'redis-namespace'
gem 'redis-rails', '>= 5.0.2'
gem 'sidekiq'
gem 'hotwire-rails'
gem 'meta-tags'

gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'slim-rails'
gem 'simple_form'
gem 'friendly_id'
# gem 'mini_magick'
# gem 'carrierwave'
# gem 'image_processing'
gem 'acts-as-taggable-on'
gem 'rack-cors'
gem 'rubyzip'
gem 'uglifier'

gem 'turbo-rails', '~> 0.8.1'

gem 'nokogiri', '>= 1.12.5'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'brakeman'
end

group :development do
  gem 'web-console'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
