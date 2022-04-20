require 'rails_helper'

RSpec.describe Char, type: :model do
  describe 'associations' do
    it { should belong_to(:role) }
    it { should respond_to(:gears) }
    it { should have_many(:gears) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_presence_of(:description) }
    it { should validate_length_of(:description).is_at_most(2000) }
    it { should validate_presence_of(:type_dmg) }
    it { should validate_presence_of(:position) }
  end

  describe 'scope' do
    it 'applies a default scope to collections by name ascending' do
      expect(Char.all.to_sql).to eq Char.all.order('name ASC').to_sql
    end
  end
end
