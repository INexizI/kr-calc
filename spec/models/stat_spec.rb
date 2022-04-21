require 'rails_helper'

RSpec.describe Stat, type: :model do
  describe 'associations' do
    it { should belong_to(:role).optional }
    it { should respond_to(:gears) }
    it { should have_many(:gears) }
  end

  describe 'validations' do
    it { should validate_presence_of(:stat_type) }
  end
end
