
# done-map

It's still just a hello-world sinatra app

## Prerequisite

- bundler

## Install & Use

```sh
$ bundle install
$ rake start
```

Open `localhost:3000` with your browser.

## APIs

* `GET /topics`
  * Returns all topic information
* `POST /topic/{topicId}/bands`
  * Register one or more bands to a specific topic. Payload should be like:
  ```
  [{"begin": 10, "end": 20}, {"begin": 50, "end": 55}, ...]
  ```
