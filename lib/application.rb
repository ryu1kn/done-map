
require 'sinatra/base'
require 'sinatra/json'
require_relative 'topic_repository'

class DoneMap < Sinatra::Base
  def initialize
    @topicRepository = TopicRepository.new
    super
  end

  get '/' do
    'Hello world!'
  end

  get '/topics' do
    json @topicRepository.to_hash
  end
end
