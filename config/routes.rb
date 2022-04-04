Rails.application.routes.draw do
  # root to: redirect('/calcs')
  root to: 'calcs#index'

  # get '/calcs/*path', to: redirect('/calcs')
  # get '/links', to: redirect('/calcs')

  match '/404', to: 'errors#not_found', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all

  resources :calcs, only: :index
  resources :links

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
