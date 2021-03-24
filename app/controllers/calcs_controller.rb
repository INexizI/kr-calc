class CalcsController < ApplicationController
  def index
    # @chars = Char.all
    # @roles = Role.all
    @perks = Perk.all
    @chars = JSON.parse(File.read('./public/json/heroes.json'))
    @roles = JSON.parse(File.read('./public/json/classes.json'))
    # @perks = JSON.parse(File.read('./public/json/perks.json'))
    # render json: @chars
  end

  def create
  end
end
