class SearchController < ApplicationController
  def index
  end

  def search
    @chars = Char.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    # @roles = Role.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @perks = Perk.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @gears = Gear.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)
    @skills = Skill.order('name ASC').ransack(name_cont: params[:q]).result(distinct: true)

    respond_to do |format|
      format.html {}
      format.json {
        @chars = @chars.limit(5)
        # @roles = @roles.limit(5)
        @perks = @perks.limit(5)
        @gears = @gears.limit(5)
        @skills = @skills.limit(5)
      }
    end
  end
end
