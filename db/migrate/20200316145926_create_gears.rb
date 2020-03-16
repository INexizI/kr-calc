class CreateGears < ActiveRecord::Migration[6.0]
  def change
    create_table :gears do |t|
      t.string :name
      t.string :description
      t.string :image
      t.string :tier
      t.string :set
      t.timestamps
    end
  end
end
