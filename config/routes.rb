Rails.application.routes.draw do
  # root to: redirect('/calcs')
  root to: 'calcs#index'

  # get '/calcs/*path', to: redirect('/')
  get '/links', to: redirect('/')

  match '/404', to: 'errors#not_found', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all

  resources :calcs, only: [:index, :create]
  resources :links, only: :show
end
