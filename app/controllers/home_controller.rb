class HomeController < ApplicationController
  def index
    @chars = Char.all
    @char = Char.offset(rand(Char.count)).first
    @gears = Gear.all
    @gear = Gear.offset(rand(Gear.count)).first
    @perks = Perk.all
    @perk = Perk.offset(rand(Perk.count)).first
    @roles = Role.all
    @role = Role.offset(rand(Role.count)).first
    @runes = Rune.all
    @rune = Rune.offset(rand(Rune.count)).first
    @skills = Skill.all
    @skill = Skill.offset(rand(Skill.count)).first
    @stats = Stat.all
    @stat = Stat.offset(rand(Stat.count)).first
  end
end
