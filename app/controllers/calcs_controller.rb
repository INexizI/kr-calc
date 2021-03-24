class CalcsController < ApplicationController
  def index
    # @chars = Char.all
    @chars = JSON.parse(File.read('./public/json/chars.json'))
    # render json: @chars
    @roles = Role.all
    @perks = Perk.all
  end
end
