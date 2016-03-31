
require 'timestamp_generator'

describe 'TimestampGenerator' do
  it 'generates current timestamp' do
    now = DateTime.new(2016, 3, 31, 21, 37, 18, '+11')
    DateTime_mock = double('DateTime', now: now)
    timestamp_generator = TimestampGenerator.new(
      datetime_class: DateTime_mock
    )
    expect(timestamp_generator.generate).to eq('2016-03-31T21:37:18+11:00')
  end
end
