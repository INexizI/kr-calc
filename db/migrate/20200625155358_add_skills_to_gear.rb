class AddSkillsToGear < ActiveRecord::Migration[6.0]
  def change
    add_column :gears, :skill, :string
    remove_column :gears, :image
  end
end
