Rails.application.routes.draw do
  resources :runes
  root to: 'home#index'

  resources :chars
  resources :roles
  resources :perks
  resources :stats
  resources :skills
  resources :gears
end
