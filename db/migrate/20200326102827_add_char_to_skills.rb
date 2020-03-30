class AddCharToSkills < ActiveRecord::Migration[6.0]
  def change
    add_reference :skills, :char, foreign_key: true
  end
end
