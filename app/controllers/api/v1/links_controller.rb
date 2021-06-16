class Api::V1::LinksController < ApplicationController
  include ActionController::HttpAuthentication::Token

  before_action :set_link, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    @links = Link.all
    # render json: {status: 'SUCCESS', message: 'Loaded links', data: @links.as_json(only: [:text, :slug])}, status: :ok
    render json: @links.as_json(only: [:text, :slug]), status: :ok
  end

  def show
    # render json: {status: 'SUCCESS', message: 'Loaded link', data: @link.as_json(only: :text)}, status: :ok
    render json: @link.as_json(only: :text), status: :ok
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      # UpdateSkuJob.perform_later(@link)
      render json: {status: 'SUCCESS', message: 'Created link', data: @link}, status: :created
    else
      render json: {status: 'ERROR', message: 'Link not created', data: @link.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @link.update(link_params)
      render json: {status: 'SUCCESS', message: 'Updated link', data: @link}, status: :created
    else
      render json: {status: 'ERROR', message: 'Link not updated', data: @link.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @link.destroy
    render json: {status: 'SUCCESS', message: 'Deleted link', data: @link}, status: :ok
  end

  private

  def set_link
    @link = Link.friendly.find(params[:id])
  end

  def authenticate_user!
    token, _options = token_and_options(request)
    user_id = AuthenticationTokenServices.decode(token)
    User.find(user_id)
  rescue ActiveRecord::RecordNotFound
    render status: :unauthorized
  end

  def link_params
    params.require(:link).permit(:text)
  end
end
