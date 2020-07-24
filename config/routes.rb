Rails.application.routes.draw do
  resources :runes
  root to: 'home#index'

  resources :calcs
  resources :chars
  resources :roles
  resources :perks
  resources :stats
  resources :skills
  resources :gears
  resources :enchants

  get :search, controller: :search
end
