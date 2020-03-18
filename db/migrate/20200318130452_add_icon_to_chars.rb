class AddIconToChars < ActiveRecord::Migration[6.0]
  def change
    add_column :chars, :icon, :string
  end
end
