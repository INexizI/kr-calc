class AddGearToStats < ActiveRecord::Migration[6.0]
  def change
    add_reference :stats, :gear, default: nil, foreign_key: true
  end
end
