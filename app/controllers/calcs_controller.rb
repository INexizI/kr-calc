class CalcsController < ApplicationController
  def index
    @chars = Char.order('name ASC')
    @perks = Perk.all
    @skills = Skill.all
    @stats = Stat.all
    @gears = Gear.all
  end

  def new
    @chars = Char.order('name ASC')
    @perks = Perk.all
    @skills = Skill.all
    @stats = Stat.all
    @gears = Gear.all

    @result = Calc.send(params[:operation], *[params[:a], params[:b]])
    render :index
  end
end
