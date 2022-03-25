class CreateRunes < ActiveRecord::Migration[6.0]
  def change
    create_table :runes do |t|
      t.string :name
      t.string :value
      t.string :type_gear
      t.string :tier
      t.timestamps
    end
  end
end
