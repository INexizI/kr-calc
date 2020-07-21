class RemoveGearToStats < ActiveRecord::Migration[6.0]
  def change
    remove_column :stats, :gear_id
  end
end
