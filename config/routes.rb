Rails.application.routes.draw do
  root to: redirect('/calcs')
  resources :calcs
  resources :links
end
