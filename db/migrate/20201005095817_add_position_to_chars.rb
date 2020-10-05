class AddPositionToChars < ActiveRecord::Migration[6.0]
  def change
    add_column :chars, :position, :string
  end
end
