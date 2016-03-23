
require 'aws-sdk'
require_relative 'topic_repository'

class Context

  def dynamodb_client
    dynamodb = Aws::DynamoDB::Client.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )
  end

  def topic_repository
    TopicRepository.new(
      dynamodb_client: dynamodb_client,
      table_name: 'done-map-topics'
    )
  end

end
