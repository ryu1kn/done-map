
require 'bigdecimal'
require 'topic_data_converter'

describe 'TopicDataConverter' do
  it 'builds topic data' do
    topic_data_converter = TopicDataConverter.new
    expect = {
      'id' => 'TOPIC_ID',
      'title' => 'TITLE',
      'total' => 240
    }
    actual = topic_data_converter.convert(
      'id' => 'TOPIC_ID',
      'title' => 'TITLE',
      'total' => BigDecimal.new('240')
    )
    expect(expect).to eq(actual)
    expect(actual['total']).to be_a(Integer)
  end
end
