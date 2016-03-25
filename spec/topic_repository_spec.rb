
require 'topic_repository'
require 'topic_data_converter'

describe 'TopicRepository' do

  it 'can provide the information of all topics' do
    topic1 = {'title' => 'TITLE1', 'total' => BigDecimal.new('240')}
    topic2 = {'title' => 'TITLE2', 'total' => BigDecimal.new('320')}
    scan_output = double('DynamoDB#scan output', :items => [topic1, topic2])
    dynamodb_mock = double('DynamoDB client', :scan => scan_output)
    uuid_generator = double('UUID generator', :generate => 'UUID')

    topicRepository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS',
      uuid_generator: uuid_generator,
      topic_data_converter: TopicDataConverter.new
    )
    actual = topicRepository.to_hash
    expect(actual).to eq([
      {'title' => 'TITLE1', 'total' => 240},
      {'title' => 'TITLE2', 'total' => 320}
    ])
    expect(actual[0]['total']).to be_a(Integer)
    expect(actual[1]['total']).to be_a(Integer)
    expect(dynamodb_mock).to have_received(:scan).with(table_name: 'DONE-MAP-TOPICS')
  end

  it 'saves a new topic' do
    dynamodb_mock = spy('DynamoDB client')
    uuid_generator = double('UUID generator', :generate => 'UUID')

    topicRepository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS',
      uuid_generator: uuid_generator,
      topic_data_converter: TopicDataConverter.new
    )
    topicRepository.put({
      'title' => 'TITLE',
      'total' => 240
    })
    expect(dynamodb_mock).to have_received(:put_item).with(
      table_name: 'DONE-MAP-TOPICS',
      item: {
        'id' => 'UUID',
        'title' => 'TITLE',
        'total' => 240
      }
    )
  end

end
