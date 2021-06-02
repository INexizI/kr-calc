class LinksController < ApplicationController
  def show
    source = 'https://krsharelink.herokuapp.com/api/v1/links/'
    resp = Net::HTTP.get_response(URI.parse(source))
    data = JSON.parse(resp.body)
    @links = data
    @q = request.original_url.byteslice(28, 30)
  end
end
