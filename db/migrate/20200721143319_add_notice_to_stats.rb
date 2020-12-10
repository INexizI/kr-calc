class AddNoticeToStats < ActiveRecord::Migration[6.0]
  def change
    add_column :stats, :notice, :integer
  end
end
