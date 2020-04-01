class AddTypeToStats < ActiveRecord::Migration[6.0]
  def change
    add_column :stats, :stat_type, :string
  end
end
