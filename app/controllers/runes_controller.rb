class RunesController < ApplicationController
  before_action :set_rune, only: [:show, :edit, :update, :destroy]

  def index
    @runes = Rune.all
  end

  def show
    # @rune = Rune.find(params[:id])
    # render json: @rune
  end

  def new
    @rune = Rune.new
  end

  def edit
  end

  def create
    @rune = Rune.new(rune_params)

    respond_to do |format|
      if @rune.save
        format.html { redirect_to @rune, notice: 'Rune was successfully created.' }
        format.json { render :show, status: :created, location: @rune }
      else
        format.html { render :new }
        format.json { render json: @rune.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @rune.update(rune_params)
        format.html { redirect_to @rune, notice: 'Rune was successfully updated.' }
        format.json { render :show, status: :ok, location: @rune }
      else
        format.html { render :edit }
        format.json { render json: @rune.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @rune.destroy
    respond_to do |format|
      format.html { redirect_to runes_url, notice: 'Rune was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_rune
      @rune = Rune.find(params[:id])
    end

    def rune_params
      params.require(:rune).permit(:name, :type_gear, :tier, :value)
    end
end
