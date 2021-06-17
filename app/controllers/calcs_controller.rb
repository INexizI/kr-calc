class CalcsController < ApplicationController
  def index
    @chars = Char.all
    @roles = Role.all
    @perks = Perk.all
    @runes = Rune.all
    @gears = Gear.all
    @stats = Stat.all
    # @chars = JSON.parse(File.read('./public/json/heroes.json'))
  end
end
