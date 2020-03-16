class PerksController < ApplicationController
  before_action :set_perk, only: [:show, :edit, :update, :destroy, :update]

  def index
    @perks = Perk.all
  end

  def show
  end

  def new
    @perk = Perk.new
  end

  def edit
  end

  def create
    @perk = Perk.new(perk_params)

    respond_to do |format|
      if @perk.save
        format.html { redirect_to @perk, notice: 'Perk was successfully created.' }
        format.json { render :show, status: :created, location: @perk }
      else
        format.html { render :new }
        format.json { render json: @perk.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @perk.update(perk_params)
        format.html { redirect_to @perk, notice: 'Perk was successfully updated.' }
        format.json { render :show, status: :ok, location: @perk }
      else
        format.html { render :edit }
        format.json { render json: @perk.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @perk.destroy
    respond_to do |format|
      format.html { redirect_to perks_url, notice: 'Perk was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_perk
      @perk = Perk.find(params[:id])
    end

    def perk_params
      params.require(:perk).permit(:name, :description, :image, :tier)
    end
end
