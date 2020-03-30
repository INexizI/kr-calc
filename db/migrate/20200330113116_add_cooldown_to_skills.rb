class AddCooldownToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :cooldown, :integer
    add_column :skills, :skill_number, :integer
  end
end
