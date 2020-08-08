class CalcsController < ApplicationController
  def index
    @chars = Char.order('name ASC')
    @roles = Role.order('id ASC')
    @perks = Perk.all
    @skills = Skill.all
    @stats = Stat.all
    @gears = Gear.all
    # T6
    @g_1h_t6 = Gear.where(tier: 'T6', gear_type: '1-1H').order('id ASC').each
    @g_2h_t6 = Gear.where(tier: 'T6', gear_type: '2-2H').order('id ASC').each
    @g_1l_t6 = Gear.where(tier: 'T6', gear_type: '3-1L').order('id ASC').each
    @g_2l_t6 = Gear.where(tier: 'T6', gear_type: '4-2L').order('id ASC').each
    @g_1i_t6 = Gear.where(tier: 'T6', gear_type: '5-1I').order('id ASC').each
    @g_2i_t6 = Gear.where(tier: 'T6', gear_type: '6-2I').order('id ASC').each
    # T7
    @g_1h_t7 = Gear.where(tier: 'T7', gear_type: '1-1H').order('id ASC').each
    @g_2h_t7 = Gear.where(tier: 'T7', gear_type: '2-2H').order('id ASC').each
    @g_1l_t7 = Gear.where(tier: 'T7', gear_type: '3-1L').order('id ASC').each
    @g_2l_t7 = Gear.where(tier: 'T7', gear_type: '4-2L').order('id ASC').each
    @g_1i_t7 = Gear.where(tier: 'T7', gear_type: '5-1I').order('id ASC').each
    @g_2i_t7 = Gear.where(tier: 'T7', gear_type: '6-2I').order('id ASC').each
    # T8
    @g_1h_t8 = Gear.where(tier: 'T8', gear_type: '1-1H').order('id ASC').each
    @g_2h_t8 = Gear.where(tier: 'T8', gear_type: '2-2H').order('id ASC').each
    @g_1l_t8 = Gear.where(tier: 'T8', gear_type: '3-1L').order('id ASC').each
    @g_2l_t8 = Gear.where(tier: 'T8', gear_type: '4-2L').order('id ASC').each
    @g_1i_t8 = Gear.where(tier: 'T8', gear_type: '5-1I').order('id ASC').each
    @g_2i_t8 = Gear.where(tier: 'T8', gear_type: '6-2I').order('id ASC').each
    # armor + secondary
    @gearsAM = Gear.where(gear_type: ['1-1H', '3-1L', '5-1I']).each
    @gearsAS = Gear.where(gear_type: ['2-2H', '4-2L', '6-2I']).each
  end

  def new
    # @result = Calc.send(params[:operation], *[params[:a], params[:b]])
    # render :index
  end

  def create
  end
end
