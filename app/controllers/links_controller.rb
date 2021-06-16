class LinksController < ApplicationController
  def show
    @links = Link.all

    @q = request.original_url[-6..-1]
  end
end
