
jest.unmock('../script/ActionInventory');

// import deepFreeze from 'deep-freeze';
import ActionInventory from '../script/ActionInventory';

describe('ActionInventory', () => {

  describe('loadTopics', () => {

    pit('loads topics from server and dispatch relevant events to store', () => {
      const store = {
        dispatch: jest.fn()
      };
      const fetchFn = jest.fn(function () {
        if (this !== window) {
          return Promise.reject(new Error('fetch must be executed on window context'));
        }
        var response = {
          json: () => Promise.resolve(['TOPIC_1'])
        };
        return Promise.resolve(response);
      });

      const inventory = new ActionInventory({store, fetchFn});
      return inventory.loadTopics().then(() => {
        expect(store.dispatch.mock.calls).toEqual([
          [{
            type: 'FETCH_TOPICS_INITIATED'
          }],
          [{
            type: 'FETCH_TOPICS_RECEIVED',
            topics: ['TOPIC_1']
          }]
        ]);
      });
    });

  });

  describe('postBand', () => {

    pit('posts a band data to server and dispatch relevant events to store', () => {
      const fetchFn = jest.fn(function () {
        return this !== window ?
          Promise.reject(new Error('fetch must be executed on window context')) :
          Promise.resolve();
      });
      const [topicId, begin, end] = ['TOPIC_ID', 10, 30];

      const inventory = new ActionInventory({fetchFn});
      return inventory.postBand(topicId, begin, end).then(() => {
        expect(fetchFn.mock.calls).toEqual([[
          '/topic/TOPIC_ID/bands',
          {
            method: 'POST',
            body: '[{"begin":10,"end":30}]'
          }
        ]]);
      });
    });

  });

});
