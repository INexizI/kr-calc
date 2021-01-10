class SearchController < ApplicationController
  def index
  end

  def search
    @chars = Char.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @perks_name = Perk.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @perks_desc = Perk.order('name ASC').ransack(description_cont: params[:q]).result(distinct: true)
    @gears = Gear.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @skills = Skill.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)

    respond_to do |format|
      format.html {}
      format.json {
        @chars = @chars.limit(5)
        @perks_name = @perks_name.limit(10)
        @perks_desc = @perks_desc.limit(10)
        @gears = @gears.limit(5)
        @skills = @skills.limit(5)
      }
    end
  end
end
