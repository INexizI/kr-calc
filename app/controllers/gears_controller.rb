class GearsController < ApplicationController
  before_action :set_gear, only: [:show, :edit, :update, :destroy]

  def index
    @gears = Gear.all
    @chars = Char.all
    @roles = Role.all
  end

  def show
    @stats = Stat.all
  end

  def new
    @gear = Gear.new
  end

  def edit
  end

  def create
    @gear = Gear.new(gear_params)

    respond_to do |format|
      if @gear.save
        format.html { redirect_to @gear, notice: 'Gear was successfully created.' }
        format.json { render :show, status: :created, location: @gear }
      else
        format.html { render :new }
        format.json { render json: @gear.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @gear.update(gear_params)
        format.html { redirect_to @gear, notice: 'Gear was successfully updated.' }
        format.json { render :show, status: :ok, location: @gear }
      else
        format.html { render :edit }
        format.json { render json: @gear.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @gear.destroy
    respond_to do |format|
      format.html { redirect_to gears_url, notice: 'Gear was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_gear
      @gear = Gear.find(params[:id])
    end

    def gear_params
      params.require(:gear).permit(:name, :tier, :star, :stat, :enchant, :set_bonus, :rune, :rune_socket, :set, :description, :image, :gear_type, :char_id, :role_id)
    end
end
