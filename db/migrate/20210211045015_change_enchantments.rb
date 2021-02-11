class ChangeEnchantments < ActiveRecord::Migration[6.0]
  def change
    remove_column :enchants, :value
    rename_column :enchants, :set, :type
    add_reference :enchants, :stat, default: nil, foreign_key: true
  end
end
