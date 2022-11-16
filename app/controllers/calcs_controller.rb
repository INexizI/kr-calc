class CalcsController < ApplicationController
  def index
    @chars = Char.all
    @roles = Role.all
    @perks = Perk.all
    @runes = Rune.all
    # @gears = Gear.all
    @gears = Gear.order(id: 'ASC')
    @arts = Gear.order(name: 'ASC')
    @stats = Stat.all
  end
end
