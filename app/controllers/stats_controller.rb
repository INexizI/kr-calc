class StatsController < ApplicationController
  before_action :set_stat, only: [:show, :edit, :update, :destroy, :update]

  def index
    @stats = Stat.all
  end

  def show
  end

  def new
    @stat = Stat.new
  end

  def edit
  end

  def create
    @stat = Stat.new(stat_params)

    respond_to do |format|
      if @stat.save
        format.html { redirect_to @stat, notice: 'Stat was successfully created.' }
        format.json { render :show, status: :created, location: @stat }
      else
        format.html { render :new }
        format.json { render json: @stat.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @stat.update(stat_params)
        format.html { redirect_to @stat, notice: 'Stat was successfully updated.' }
        format.json { render :show, status: :ok, location: @stat }
      else
        format.html { render :edit }
        format.json { render json: @stat.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @stat.destroy
    respond_to do |format|
      format.html { redirect_to stats_url, notice: 'Stat was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_stat
      @stat = Stat.find(params[:id])
    end

    def stat_params
      params.require(:stat).permit(:name, :value, :stat_type, :role_id)
    end
end
