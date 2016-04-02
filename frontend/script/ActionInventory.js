
export default class ActionInventory {
  constructor({$, store}) {
    this._store = store;
    this._$ = $;
  }

  loadTopics() {
    this._store.dispatch({
      type: 'FETCH_TOPICS_INITIATED'
    });
    this._$.get('/topics', topics => {
      this._store.dispatch({
        type: 'FETCH_TOPICS_RECEIVED',
        topics
      });
    });
  }

  postBand(topicId, begin, end) {
    return new Promise(resolve => {
      this._$.ajax({
        url: '/topic/' + topicId + '/bands',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        contentType: 'application/json',
        data: JSON.stringify([{
          begin: begin,
          end: end
        }])
      })
      .done(resolve);
    });
  }
}
