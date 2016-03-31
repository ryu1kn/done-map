
require 'topic_repository'
require 'topic_data_converter'

describe 'TopicRepository' do
  it 'can provide the information of all topics' do
    topic1 = {
      'id' => 'TOPIC_ID_1',
      'title' => 'TITLE1',
      'total' => BigDecimal.new('240')
    }
    topic2 = {
      'id' => 'TOPIC_ID_2',
      'title' => 'TITLE2',
      'total' => BigDecimal.new('320')
    }
    scan_output = double('DynamoDB#scan output', items: [topic1, topic2])
    dynamodb_mock = double('DynamoDB client', scan: scan_output)
    uuid_generator = double('UUID generator', generate: 'UUID')

    topic_repository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS',
      uuid_generator: uuid_generator,
      topic_data_converter: TopicDataConverter.new
    )
    actual = topic_repository.to_hash
    expect(actual).to eq(
      [
        {
          id: 'TOPIC_ID_1',
          title: 'TITLE1',
          total: 240,
          bands: []
        },
        {
          id: 'TOPIC_ID_2',
          title: 'TITLE2',
          total: 320,
          bands: []
        }
      ])
    expect(actual[0][:total]).to be_a(Integer)
    expect(actual[1][:total]).to be_a(Integer)
    expect(dynamodb_mock).to have_received(:scan).with(
      table_name: 'DONE-MAP-TOPICS'
    )
  end

  it 'saves a new topic' do
    dynamodb_mock = spy('DynamoDB client')
    uuid_generator = double('UUID generator', generate: 'UUID')

    topic_repository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS',
      uuid_generator: uuid_generator,
      topic_data_converter: TopicDataConverter.new
    )
    topic_repository.put(
      title: 'TITLE',
      total: 240
    )
    expect(dynamodb_mock).to have_received(:put_item).with(
      table_name: 'DONE-MAP-TOPICS',
      item: {
        id: 'UUID',
        title: 'TITLE',
        total: 240
      }
    )
  end

  it 'registers one or more bands to a specified topic with timestamp' do
    dynamodb_mock = spy('DynamoDB client')
    timestamp_generator = double(
      'TimestampGenerator',
      generate: '2016-03-31T21:37:18+11:00'
    )

    topic_repository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS',
      uuid_generator: nil,
      timestamp_generator: timestamp_generator,
      topic_data_converter: nil
    )

    topic_id = 'TOPIC_ID'
    bands = [{ begin: 10, end: 20 }]
    topic_repository.save_bands(topic_id, bands)
    expect(dynamodb_mock).to have_received(:update_item).with(
      table_name: 'DONE-MAP-TOPICS',
      key: { id: 'TOPIC_ID' },
      update_expression: 'SET bands = ' \
        'list_append(if_not_exists(bands, :empty_list), :new_bands)',
      expression_attribute_values: {
        ':new_bands' => [{
          begin: 10,
          end: 20,
          timestamp: '2016-03-31T21:37:18+11:00'
        }],
        ':empty_list' => []
      }
    )
  end
end
