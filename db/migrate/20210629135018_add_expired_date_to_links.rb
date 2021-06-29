class AddExpiredDateToLinks < ActiveRecord::Migration[6.1]
  def change
    add_column :links, :date_expired, :datetime
  end
end
