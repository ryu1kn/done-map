
class TopicRepository

  def initialize(dynamodb_client:, table_name:)
    @dynamodb_client = dynamodb_client
    @table_name = table_name
  end

  def to_hash
    @dynamodb_client.scan(table_name: @table_name).items
  end

end
