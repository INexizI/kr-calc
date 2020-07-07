class RenameOrderToPerk < ActiveRecord::Migration[6.0]
  def change
    rename_column :perks, :order, :sequence
  end
end
