
require 'sinatra/base'
require 'sinatra/json'
require_relative 'context'

class DoneMap < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :public_folder, proc { File.join(root, '..', 'public') }

  def initialize(app: nil, context: ::Context.new)
    @context = context
    super(app)
  end

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/topics' do
    json @context.topic_repository.to_hash
  end

  put '/topic' do
    data = JSON.parse(request.body.read, symbolize_names: true)
    @context.topic_repository.put data
  end

  post '/topic/:topic_id/bands' do
    data = JSON.parse(request.body.read, symbolize_names: true)
    @context.topic_repository.save_bands params['topic_id'], data
  end
end
