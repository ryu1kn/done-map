
require 'aws-sdk'
require 'securerandom'
require_relative 'uuid_generator'
require_relative 'topic_data_converter'
require_relative 'topic_repository'

class Context
  def dynamodb_client
    is_on_aws = ENV['AWS_REGION'].nil?
    params = is_on_aws ? {} : {
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    }
    Aws::DynamoDB::Client.new params
  end

  def topic_repository
    TopicRepository.new(
      dynamodb_client: dynamodb_client,
      table_name: 'done-map-topics',
      uuid_generator: uuid_generator,
      topic_data_converter: topic_data_converter
    )
  end

  def uuid_generator
    UuidGenerator.new(
      secure_random: SecureRandom
    )
  end

  def topic_data_converter
    TopicDataConverter.new
  end
end
