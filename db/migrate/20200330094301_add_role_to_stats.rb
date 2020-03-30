class AddRoleToStats < ActiveRecord::Migration[6.0]
  def change
    add_reference :stats, :role, default: nil, foreign_key: true
  end
end
