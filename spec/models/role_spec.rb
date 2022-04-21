require 'rails_helper'

RSpec.describe Role, type: :model do
  describe 'associations' do
    it { should respond_to(:chars) }
    it { should have_many(:chars) }
    it { should respond_to(:gears) }
    it { should have_many(:gears) }
    it { should respond_to(:stats) }
    it { should have_many(:stats).class_name('Stat') }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3) }
  end

  describe 'scope' do
    it 'applies a default scope to collections by name ascending' do
      expect(Char.all.to_sql).to eq Char.all.order('name ASC').to_sql
    end
  end
end
