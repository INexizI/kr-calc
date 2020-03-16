class HeroesController < ApplicationController
  before_action :set_hero, only: [:show, :edit, :update, :destroy, :update]

  def index
    @heroes = Hero.order('name ASC')
  end

  def show
  end

  def new
    @hero = Hero.new
  end

  def edit
  end

  def create
    @hero = Hero.new(hero_params)

    respond_to do |format|
      if @hero.save
        format.html { redirect_to @hero, notice: 'Hero was successfully created.' }
        format.json { render :show, status: :created, location: @hero }
      else
        format.html { render :new }
        format.json { render json: @hero.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @hero.update(hero_params)
        format.html { redirect_to @hero, notice: 'Hero was successfully updated.' }
        format.json { render :show, status: :ok, location: @hero }
      else
        format.html { render :edit }
        format.json { render json: @hero.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @hero.destroy
    respond_to do |format|
      format.html { redirect_to heroes_url, notice: 'Hero was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_hero
      @hero = Hero.find(params[:id])
    end

    def hero_params
      params.require(:hero).permit(:name, :description, :avatar, :background)
    end
end
