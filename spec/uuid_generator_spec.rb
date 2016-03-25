
require 'uuid_generator'

describe 'UuidGenerator' do

  it 'generates uuid' do
    secure_random = double('SecureRandom', :uuid => 'UUID')
    uuid_generator = UuidGenerator.new(
      secure_random: secure_random
    )
    expect(uuid_generator.generate).to eq('UUID')
  end

end
