class Link < ActiveRecord::Migration[6.1]
  create_table :links do |t|
    t.string :title
    t.string :text

    t.timestamps
  end
end
