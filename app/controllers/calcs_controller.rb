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

    # Load data from JSON files
    @charsJ = JSON.parse(File.read('./public/json/heroes.json'))
    # @rolesJ = JSON.parse(File.read('./public/json/roles.json'))
    # @runesJ = JSON.parse(File.read('./public/json/runes.json'))
    @gearsJ = JSON.parse(File.read('./public/json/gears.json'))
  end
end
