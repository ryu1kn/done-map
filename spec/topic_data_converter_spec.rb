
require 'bigdecimal'
require 'topic_data_converter'

describe 'TopicDataConverter' do
  it 'builds topic data, converts bigdecimal into integer' do
    topic_data_converter = TopicDataConverter.new
    expect = {
      'id' => 'TOPIC_ID',
      'title' => 'TITLE',
      'total' => 240,
      'bands' => [{ 'begin' => 10, 'end' => 20 }]
    }
    actual = topic_data_converter.convert(
      'id' => 'TOPIC_ID',
      'title' => 'TITLE',
      'total' => BigDecimal.new('240'),
      'bands' => [{
        'begin' => BigDecimal.new('10'),
        'end' => BigDecimal.new('20')
      }]
    )
    expect(expect).to eq(actual)
    expect(actual['total']).to be_a(Integer)
    expect(actual['bands'][0]['begin']).to be_a(Integer)
    expect(actual['bands'][0]['end']).to be_a(Integer)
  end

  it 'set "bands" empty list if not given' do
    topic_data_converter = TopicDataConverter.new
    expect = {
      'id' => 'TOPIC_ID',
      'title' => 'TITLE',
      'total' => 240,
      'bands' => []
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
