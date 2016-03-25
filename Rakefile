
task :start do
  sh 'bundle exec unicorn -p 3000'
end

task :test do
  sh 'rspec spec'
end

task :lint do
  sh 'rubocop . --display-cop-names'
end

task prep: [:lint, :test]
