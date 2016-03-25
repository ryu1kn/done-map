
class TopicDataConverter

  def convert(data)
    {'title' => data['title'], 'total' => data['total'].to_i}
  end

end
