
# done-map

A web app to keep track of which part you've done on something.
For example, you can record which pages/chapters you've read in a book.

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
* `PUT /topic`
  ```
  {
    "title": "TITLE",
    "total": 240
  }
  ```
  * Create one topic
* `POST /topic/{topic_id}/bands`
  ```
  [
    {"begin": 10, "end": 20},
    {"begin": 50, "end": 55},
    ...
  ]
  ```
  * Register one or more bands to a specific topic
