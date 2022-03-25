class AddParentToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :parent_id, :string
  end
end
