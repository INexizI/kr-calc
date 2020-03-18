class AddSlugToChars < ActiveRecord::Migration[6.0]
  def change
    add_column :chars, :slug, :string
    add_index :chars, :slug, unique: true
  end
end
