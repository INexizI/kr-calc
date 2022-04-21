require 'rails_helper'

RSpec.describe Gear, type: :model do
  describe 'associations' do
    it { should belong_to(:char).optional }
    it { should belong_to(:role).optional }
    it { should belong_to(:stat).optional }
  end

  describe 'validations' do
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_length_of(:description).is_at_most(3000) }
  end
end
