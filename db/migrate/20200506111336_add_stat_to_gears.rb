class AddStatToGears < ActiveRecord::Migration[6.0]
  def change
    add_reference :gears, :stat, foreign_key: true
  end
end
