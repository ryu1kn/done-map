
export default class ActionInventory {
  constructor({store, fetchFn}) {
    this._store = store;
    this._fetchFn = fetchFn.bind(window);
  }

  loadTopics() {
    this._store.dispatch({
      type: 'FETCH_TOPICS_INITIATED'
    });
    return this._fetchFn('/topics').then(response => {
      return response.json();
    }).then(responseBody => {
      this._store.dispatch({
        type: 'FETCH_TOPICS_RECEIVED',
        topics: responseBody
      });
    });
  }

  postBand(topicId, begin, end) {
    return this._fetchFn(`/topic/${topicId}/bands`, {
      method: 'POST',
      body: JSON.stringify([{
        begin: begin,
        end: end
      }])
    });
  }
}
