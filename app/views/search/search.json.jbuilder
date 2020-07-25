json.chars do
  json.array!(@chars) do |char|
    json.name char.name
    json.url char_path(char)
  end
end

json.perks do
  json.array!(@perks) do |perk|
    json.name perk.name
    json.description perk.description
    json.url perk_path(perk)
  end
end

json.gears do
  json.array!(@gears) do |gear|
    json.name gear.name
    json.url gear_path(gear)
  end
end

json.skills do
  json.array!(@skills) do |skill|
    json.name skill.name
    json.url skill_path(skill)
  end
end
