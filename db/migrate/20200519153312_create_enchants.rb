class CreateEnchants < ActiveRecord::Migration[6.0]
  def change
    create_table :enchants do |t|
      t.string :name
      t.string :value
      t.string :tier
      t.string :set
      t.timestamps
    end
  end
end
