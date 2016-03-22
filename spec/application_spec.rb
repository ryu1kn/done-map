
ENV['RACK_ENV'] = 'test'

require 'application'
require 'rack/test'

describe 'The Hello World App' do
  include Rack::Test::Methods

  def app
    DoneMap.new
  end

  it 'says hello' do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to eq('Hello world!')
  end
end
