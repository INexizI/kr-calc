class LinksController < ApplicationController
  def show
    # @links = Link.all
    source = 'https://krsharelink.herokuapp.com/api/v1/links/'
    resp = Net::HTTP.get_response(URI.parse(source))
    data = JSON.parse(resp.body)
    @links = data
    # @q = request.original_url.byteslice(28, 30) #localhost
    # @q = request.original_url.byteslice(36, 38) #heroku
    @q = request.original_url[-6..-1]
  end
end
