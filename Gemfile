source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.3'

gem 'rails', '~> 7.1.3'
gem 'pg'
gem 'puma', '>= 6.4.2'
gem 'bootsnap', require: false
gem 'sass-rails', '>= 6.0.0'

gem 'webpacker', '>= 5.4.4'
gem 'jbuilder'
gem 'json'
gem 'redis'
gem 'redis-namespace'
gem 'redis-rails', '>= 5.0.2'
gem 'sidekiq', '>= 7.1.3'
gem 'hotwire-rails', '>= 0.1.3'
gem 'meta-tags', '>= 2.20.0'

gem 'ransack'
# gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'slim-rails', '>= 3.6.3'
gem 'simple_form', '>= 5.3.0'
gem 'friendly_id'
# gem 'mini_magick'
# gem 'carrierwave'
# gem 'image_processing'
gem 'acts-as-taggable-on'
gem 'rack-cors'
gem 'rubyzip'
gem 'uglifier'
gem 'dotenv-rails'

gem 'turbo-rails', '~> 1.3.0'

gem 'nokogiri', '~> 1.16'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'brakeman'
  gem 'rspec-rails', '~> 6.0.3.0'
end

group :development do
  gem 'web-console', '>= 4.2.1'
  gem 'listen'
  # gem 'spring'
  # gem 'spring-watcher-listen'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'shoulda-matchers'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
