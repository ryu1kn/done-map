
require 'sinatra/base'
require 'sinatra/json'
require_relative 'context'

class DoneMap < Sinatra::Base
  def initialize(app: nil, context: ::Context.new)
    @context = context
    super(app)
  end

  get '/' do
    'Hello world!'
  end

  get '/topics' do
    json @context.topic_repository.to_hash
  end

  put '/topic' do
    data = JSON.parse request.body.read
    @context.topic_repository.put data
  end

  post '/topic/:topic_id/bands' do
    data = JSON.parse request.body.read
    @context.topic_repository.save_bands params['topic_id'], data
  end
end
