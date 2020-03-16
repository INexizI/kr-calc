class CreateHeroes < ActiveRecord::Migration[6.0]
  def change
    create_table :heroes do |t|
      t.string :name
      t.string :description
      t.string :avatar
      t.string :background
      t.timestamps
    end
  end
end
