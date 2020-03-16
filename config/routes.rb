Rails.application.routes.draw do
  # root to: 'heroes#index'
  root to: 'home#index'

  resources :heroes
  resources :roles
  resources :perks
  resources :stats
  resources :skills
  resources :gears
end
