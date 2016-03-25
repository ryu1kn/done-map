
class TopicDataConverter
  def convert(data)
    {
      'id' => data['id'],
      'title' => data['title'],
      'total' => data['total'].to_i
    }
  end
end
