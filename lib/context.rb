
require 'aws-sdk'
require 'securerandom'
require 'time'
require_relative 'uuid_generator'
require_relative 'timestamp_generator'
require_relative 'topic_data_converter'
require_relative 'topic_repository'

class Context
  def dynamodb_client
    Aws::DynamoDB::Client.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )
  end

  def topic_repository
    TopicRepository.new(
      dynamodb_client: dynamodb_client,
      table_name: 'done-map-topics',
      uuid_generator: uuid_generator,
      timestamp_generator: timestamp_generator,
      topic_data_converter: topic_data_converter
    )
  end

  def timestamp_generator
    TimestampGenerator.new(datetime_class: DateTime)
  end

  def uuid_generator
    UuidGenerator.new(secure_random: SecureRandom)
  end

  def topic_data_converter
    TopicDataConverter.new
  end
end
