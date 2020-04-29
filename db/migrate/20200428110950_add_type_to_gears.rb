class AddTypeToGears < ActiveRecord::Migration[6.0]
  def change
      add_column :gears, :gear_type, :string
  end
end
