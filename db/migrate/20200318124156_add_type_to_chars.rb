class AddTypeToChars < ActiveRecord::Migration[6.0]
  def change
    add_column :chars, :type_dmg, :string
  end
end
