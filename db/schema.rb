# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_16_100239) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calcs", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "chars", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.string "type_dmg"
    t.bigint "role_id"
    t.string "position"
    t.index ["role_id"], name: "index_chars_on_role_id"
    t.index ["slug"], name: "index_chars_on_slug", unique: true
  end

  create_table "enchants", force: :cascade do |t|
    t.string "name"
    t.string "tier"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "stat_id"
    t.index ["stat_id"], name: "index_enchants_on_stat_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "gears", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "tier"
    t.string "set"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "gear_type"
    t.bigint "char_id"
    t.bigint "stat_id"
    t.bigint "role_id"
    t.string "gear_skill"
    t.index ["char_id"], name: "index_gears_on_char_id"
    t.index ["role_id"], name: "index_gears_on_role_id"
    t.index ["stat_id"], name: "index_gears_on_stat_id"
  end

  create_table "links", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["slug"], name: "index_links_on_slug", unique: true
  end

  create_table "perks", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "tier"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "sequence"
    t.string "perk_type"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["slug"], name: "index_roles_on_slug", unique: true
  end

  create_table "runes", force: :cascade do |t|
    t.string "name"
    t.string "value", default: "{}"
    t.string "type_gear"
    t.string "tier"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "mana"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "char_id"
    t.integer "cooldown"
    t.string "skill_number"
    t.string "parent_id"
    t.index ["char_id"], name: "index_skills_on_char_id"
  end

  create_table "stats", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "role_id"
    t.string "stat_type"
    t.integer "notice"
    t.index ["role_id"], name: "index_stats_on_role_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "taggings_taggable_context_idx"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  add_foreign_key "chars", "roles"
  add_foreign_key "enchants", "stats"
  add_foreign_key "gears", "chars", name: "gears_char_id_fkey"
  add_foreign_key "gears", "roles"
  add_foreign_key "gears", "stats", name: "gears_stat_id_fkey"
  add_foreign_key "skills", "chars", name: "skills_char_id_fkey"
  add_foreign_key "stats", "roles"
  add_foreign_key "taggings", "tags"
end
