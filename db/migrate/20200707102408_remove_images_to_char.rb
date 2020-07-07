class RemoveImagesToChar < ActiveRecord::Migration[6.0]
  def change
    remove_column :chars, :avatar
    remove_column :chars, :background
    remove_column :chars, :icon
  end
end
