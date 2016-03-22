
require 'topic_repository'

describe 'TopicRepository' do
  it 'can provide the information of all topics' do
    topicRepository = TopicRepository.new
    expect(topicRepository.to_hash).to include(
      :key1 => 'value1',
      :key2 => 'value2'
    )
  end
end
