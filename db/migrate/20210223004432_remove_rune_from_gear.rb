class RemoveRuneFromGear < ActiveRecord::Migration[6.0]
  def change
    remove_column :gears, :rune_id
  end
end
