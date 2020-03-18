class AddRoleToChars < ActiveRecord::Migration[6.0]
  def change
    add_reference :chars, :role, foreign_key: true
  end
end
