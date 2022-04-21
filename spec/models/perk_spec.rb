require 'rails_helper'

RSpec.describe Perk, type: :model do

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_presence_of(:description) }
    it { should validate_length_of(:description).is_at_most(3000) }
    it { should validate_presence_of(:tier) }
    it { should validate_presence_of(:sequence) }
    it { should validate_presence_of(:perk_type) }
  end
end
