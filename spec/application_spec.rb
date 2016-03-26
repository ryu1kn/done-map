
ENV['RACK_ENV'] = 'test'

require 'application'
require 'rack/test'

describe 'DoneMap App' do
  include Rack::Test::Methods

  def app
    DoneMap.new(context: double('Context'))
  end

  it 'returns HTML page' do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body.lines.first).to eq("<!DOCTYPE html>\n")
  end
end
