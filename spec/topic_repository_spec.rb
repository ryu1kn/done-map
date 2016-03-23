
require 'topic_repository'

describe 'TopicRepository' do

  it 'can provide the information of all topics' do
    scan_output = double('DynamoDB#scan output', :items => ['TOPIC_1', 'TOPIC_2'])
    dynamodb_mock = double('DynamoDB client', :scan => scan_output)

    topicRepository = TopicRepository.new(
      dynamodb_client: dynamodb_mock,
      table_name: 'DONE-MAP-TOPICS'
    )
    expect(topicRepository.to_hash).to eq(['TOPIC_1', 'TOPIC_2'])
    expect(dynamodb_mock).to have_received(:scan).with(table_name: 'DONE-MAP-TOPICS')
  end

end
