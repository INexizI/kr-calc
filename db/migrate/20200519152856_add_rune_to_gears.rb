class AddRuneToGears < ActiveRecord::Migration[6.0]
  def change
    add_reference :gears, :rune, default: nil, foreign_key: true
  end
end
