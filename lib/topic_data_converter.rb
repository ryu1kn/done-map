
class TopicDataConverter
  def convert(data)
    {
      'id' => data['id'],
      'title' => data['title'],
      'total' => data['total'].to_i,
      'bands' => convert_bands(data['bands'] || [])
    }
  end

  private

  def convert_bands(bands)
    bands.map do |band|
      {
        'begin' => band['begin'].to_i,
        'end' => band['end'].to_i
      }
    end
  end
end
