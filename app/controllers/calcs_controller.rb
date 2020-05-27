class CalcsController < ApplicationController
  def index
    @chars = Char.order('name ASC')
    @roles = Role.order('id ASC')
    @perks = Perk.all
    @skills = Skill.all
    @stats = Stat.all
    @gears = Gear.all
  end

  def new
    # @result = Calc.send(params[:operation], *[params[:a], params[:b]])
    # render :index
  end

  def create
  end
end
