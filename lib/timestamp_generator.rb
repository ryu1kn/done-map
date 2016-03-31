
class TimestampGenerator
  def initialize(datetime_class:)
    @datetime_class = datetime_class
  end

  def generate
    @datetime_class.now.iso8601
  end
end
