class AddRoleToGears < ActiveRecord::Migration[6.0]
  def change
    add_reference :gears, :role, default: nil, foreign_key: true
  end
end
