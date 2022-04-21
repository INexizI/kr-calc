require 'rails_helper'

RSpec.describe Rune, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_presence_of(:value) }
    it { should validate_presence_of(:type_gear) }
    it { should validate_presence_of(:tier) }
  end
end
