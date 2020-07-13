class AddTypeToPerks < ActiveRecord::Migration[6.0]
  def change
    add_column :perks, :perk_type, :string
  end
end
