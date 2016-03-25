
class UuidGenerator

  def initialize(secure_random:)
    @secure_random = secure_random
  end

  def generate
    @secure_random.uuid
  end

end
