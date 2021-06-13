source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.1'

gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3', '>= 4.3.8'
gem 'sass-rails', '>= 6.0.0'
gem 'webpacker', '~> 4.3', '>= 4.3.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
gem 'json', '~> 2.5', '>= 2.5.1'

gem 'bootsnap', '>= 1.4.2', require: false

gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'slim-rails', '>= 3.2.0'
gem 'simple_form', '>= 5.1.0'
gem 'friendly_id'
gem 'mini_magick'
gem 'carrierwave'
gem 'image_processing'
gem 'acts-as-taggable-on'
gem 'rack-cors'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'brakeman'
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara', '>= 3.35.3'
  gem 'selenium-webdriver'
  gem 'webdrivers', '>= 4.6.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
