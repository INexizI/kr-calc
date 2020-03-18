class CreateChars < ActiveRecord::Migration[6.0]
  def change
    create_table :chars do |t|
      t.string :name
      t.string :description
      t.string :avatar
      t.string :background
      t.timestamps
    end
  end
end
