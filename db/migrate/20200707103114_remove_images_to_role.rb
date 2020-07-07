class RemoveImagesToRole < ActiveRecord::Migration[6.0]
  def change
    remove_column :roles, :image
  end
end
