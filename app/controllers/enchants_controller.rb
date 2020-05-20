class EnchantsController < ApplicationController
  before_action :set_enchant, only: [:show, :edit, :update, :destroy]

  def index
    @enchants = Enchant.all
  end

  def show
  end

  def new
    @enchant = Enchant.new
  end

  def edit
  end

  def create
    @enchant = Enchant.new(enchant_params)

    respond_to do |format|
      if @enchant.save
        format.html { redirect_to @enchant, notice: 'Enchant was successfully created.' }
        format.json { render :show, status: :created, location: @enchant }
      else
        format.html { render :new }
        format.json { render json: @enchant.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @enchant.update(enchant_params)
        format.html { redirect_to @enchant, notice: 'Enchant was successfully updated.' }
        format.json { render :show, status: :ok, location: @enchant }
      else
        format.html { render :edit }
        format.json { render json: @enchant.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @enchant.destroy
    respond_to do |format|
      format.html { redirect_to enchants_url, notice: 'Enchant was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_enchant
      @enchant = Enchant.find(params[:id])
    end

    def enchant_params
      params.require(:enchant).permit(:name, :value, :tier, :set)
    end
end
