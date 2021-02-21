class HomeController < ApplicationController
  def index
    @char = Char.offset(rand(Char.count)).first
    @gear = Gear.offset(rand(Gear.count)).first
    @perk = Perk.offset(rand(Perk.count)).first
    @role = Role.offset(rand(Role.count)).first
    @rune = Rune.offset(rand(Rune.count)).first
    @skill = Skill.offset(rand(Skill.where('skill_number < ?', '5').count)).first
    @stat = Stat.offset(rand(Stat.count)).first
  end
end
