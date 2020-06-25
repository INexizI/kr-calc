class AddOrderToPerk < ActiveRecord::Migration[6.0]
  def change
    add_column :perks, :order, :string
    remove_column :perks, :image
  end
end
