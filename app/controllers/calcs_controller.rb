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
    @g_j_r_t6 = Gear.where(tier: 'T6', gear_type: '7-J', name: 'Ring').order('id ASC').each
    @g_j_e_t6 = Gear.where(tier: 'T6', gear_type: '7-J', name: 'Earrings').order('id ASC').each
    @g_j_n_t6 = Gear.where(tier: 'T6', gear_type: '7-J', name: 'Necklace').order('id ASC').each
    @g_j_b_t6 = Gear.where(tier: 'T6', gear_type: '7-J', name: 'Bracelet').order('id ASC').each
    @g_o_t6 = Gear.where(tier: 'T6', gear_type: '8-O').order('id ASC').each
    # T7
    @g_1h_t7 = Gear.where(tier: 'T7', gear_type: '1-1H').order('id ASC').each
    @g_2h_t7 = Gear.where(tier: 'T7', gear_type: '2-2H').order('id ASC').each
    @g_1l_t7 = Gear.where(tier: 'T7', gear_type: '3-1L').order('id ASC').each
    @g_2l_t7 = Gear.where(tier: 'T7', gear_type: '4-2L').order('id ASC').each
    @g_1i_t7 = Gear.where(tier: 'T7', gear_type: '5-1I').order('id ASC').each
    @g_2i_t7 = Gear.where(tier: 'T7', gear_type: '6-2I').order('id ASC').each
    @g_j_r_t7 = Gear.where(tier: 'T7', gear_type: '7-J', name: 'Ring').order('id ASC').each
    @g_j_e_t7 = Gear.where(tier: 'T7', gear_type: '7-J', name: 'Earrings').order('id ASC').each
    @g_j_n_t7 = Gear.where(tier: 'T7', gear_type: '7-J', name: 'Necklace').order('id ASC').each
    @g_j_b_t7 = Gear.where(tier: 'T7', gear_type: '7-J', name: 'Bracelet').order('id ASC').each
    @g_o_t7 = Gear.where(tier: 'T7', gear_type: '8-O').order('id ASC').each
    # T8
    @g_1h_t8 = Gear.where(tier: 'T8', gear_type: '1-1H').order('id ASC').each
    @g_2h_t8 = Gear.where(tier: 'T8', gear_type: '2-2H').order('id ASC').each
    @g_1l_t8 = Gear.where(tier: 'T8', gear_type: '3-1L').order('id ASC').each
    @g_2l_t8 = Gear.where(tier: 'T8', gear_type: '4-2L').order('id ASC').each
    @g_1i_t8 = Gear.where(tier: 'T8', gear_type: '5-1I').order('id ASC').each
    @g_2i_t8 = Gear.where(tier: 'T8', gear_type: '6-2I').order('id ASC').each
    @g_j_r_t8 = Gear.where(tier: 'T8', gear_type: '7-J', name: ['Ring', "Hell's Eyes", 'Ring of Amplification']).order('id ASC').each
    @g_j_e_t8 = Gear.where(tier: 'T8', gear_type: '7-J', name: ['Earrings', "Fire Dragon's Blessing", 'Earrings of Amplification']).order('id ASC').each
    @g_j_n_t8 = Gear.where(tier: 'T8', gear_type: '7-J', name: ['Necklace', 'Price of Arrogance']).order('id ASC').each
    @g_j_b_t8 = Gear.where(tier: 'T8', gear_type: '7-J', name: ['Bracelet', 'Fire Circle']).order('id ASC').each
    @g_o_t8 = Gear.where(tier: 'T8', gear_type: '8-O').order('id ASC').each
    # armor + secondary
    @gearsAM = Gear.where(gear_type: ['1-1H', '3-1L', '5-1I']).each
    @gearsAS = Gear.where(gear_type: ['2-2H', '4-2L', '6-2I']).each
    @gearsAJ = Gear.where(gear_type: '7-J').each
    @gearsAO = Gear.where(gear_type: '8-O').each
  end

  def new
    # @result = Calc.send(params[:operation], *[params[:a], params[:b]])
    # render :index
  end

  def create
  end
end
