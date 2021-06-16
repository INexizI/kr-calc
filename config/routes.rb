Rails.application.routes.draw do
  root to: redirect('/calcs')

  get '/calcs/*path', to: redirect('/calcs')
  get '/links', to: redirect('/calcs')

  match '/404', to: 'errors#not_found', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all

  resources :calcs, only: [:index, :create]
  resources :links, only: :show

  namespace :api do
    namespace :v1 do
      resources :links

      post 'authenticate', to: 'authentication#create'
    end
  end
end
