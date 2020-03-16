class CreatePerks < ActiveRecord::Migration[6.0]
  def change
    create_table :perks do |t|
      t.string :name
      t.string :description
      t.string :image
      t.string :tier
      t.timestamps
    end
  end
end
