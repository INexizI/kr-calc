class Stat < ApplicationRecord
  belongs_to :role, optional: true
  belongs_to :gear, optional: true
end
