class CalcsController < ApplicationController
  def index
    @chars = Char.all
    @roles = Role.all
    @perks = Perk.all
    @stats = Stat.all
  end

  def new
    # @result = Calc.send(params[:operation], *[params[:a], params[:b]])
    # render :index
  end

  def create
  end
end
