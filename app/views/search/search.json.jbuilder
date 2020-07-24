json.chars do
  json.array!(@chars) do |char|
    json.name char.name
    # json.icon 
    json.url char_path(char)
  end
end

# json.roles do
#   json.array!(@roles) do |role|
#     json.name role.name
#     json.icon
#     json.url role_path(role)
#   end
# end

json.perks do
  json.array!(@perks) do |perk|
    json.name perk.name
    # json.icon
    json.url perk_path(perk)
  end
end

json.gears do
  json.array!(@gears) do |gear|
    json.name gear.name
    # json.icon
    json.url gear_path(gear)
  end
end

json.skills do
  json.array!(@skills) do |skill|
    json.name skill.name
    # json.icon
    json.url skill_path(skill)
  end
end
