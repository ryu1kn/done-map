
task :start do
  sh 'bundle exec unicorn -p 3000'
end

task :test do
  sh 'rspec spec'
end

task :lint do
  sh 'rubocop . --display-cop-names'
  sh '(cd frontend && npm run lint)'
end

task :build_frontend do
  sh '(cd frontend && npm run build)'
  sh 'rm -rf public'
  sh 'cp -r frontend/dest public'
end

task :clean do
  sh 'rm -rf public frontend/{node_modules,dest}'
end

task prep: [:lint, :test]
