Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://krsharelink.herokuapp.com/', 'https://kr-calc.herokuapp.com/', 'http://localhost:3000/'
    resource '*', headers: :any, methods: [:get, :post]
  end
end
