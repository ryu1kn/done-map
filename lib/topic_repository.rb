
class TopicRepository
  def initialize(params)
    @dynamodb_client = params[:dynamodb_client]
    @table_name = params[:table_name]
    @timestamp_generator = params[:timestamp_generator]
    @uuid_generator = params[:uuid_generator]
    @topic_data_converter = params[:topic_data_converter]
  end

  def put(topic_data)
    item = { id: @uuid_generator.generate }.merge(topic_data)
    @dynamodb_client.put_item(
      table_name: @table_name,
      item: item
    )
  end

  def save_bands(topic_id, bands)
    @dynamodb_client.update_item(
      table_name: @table_name,
      key: { id: topic_id },
      update_expression: 'SET bands = ' \
        'list_append(if_not_exists(bands, :empty_list), :new_bands)',
      expression_attribute_values: {
        ':new_bands' => add_timestamp(bands),
        ':empty_list' => []
      }
    )
  end

  def to_hash
    topics = @dynamodb_client.scan(table_name: @table_name).items
    topics.map do |topic|
      @topic_data_converter.convert(topic)
    end
  end

  private

  def add_timestamp(bands)
    timestamp = @timestamp_generator.generate
    bands.map do |band|
      band.merge timestamp: timestamp
    end
  end
end
