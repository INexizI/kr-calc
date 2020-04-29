class AddCharToGears < ActiveRecord::Migration[6.0]
  def change
    add_reference :gears, :char, default: nil, foreign_key: true
  end
end
