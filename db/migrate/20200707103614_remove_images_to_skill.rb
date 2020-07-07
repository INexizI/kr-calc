class RemoveImagesToSkill < ActiveRecord::Migration[6.0]
  def change
    remove_column :skills, :image
  end
end
