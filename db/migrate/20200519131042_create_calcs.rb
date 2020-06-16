class CreateCalcs < ActiveRecord::Migration[6.0]
  def change
    create_table :calcs do |t|
      t.timestamps
    end
  end
end
