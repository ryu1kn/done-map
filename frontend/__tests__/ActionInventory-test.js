
jest.unmock('../script/ActionInventory');

// import deepFreeze from 'deep-freeze';
import ActionInventory from '../script/ActionInventory';

describe('ActionInventory', () => {

  describe('loadTopics', () => {

    it('loads topics from server and dispatch relevant events to store', () => {
      const store = {
        dispatch: jest.fn()
      };
      const $ = {
        get: jest.fn((url, callback) => callback(['TOPIC_1']))
      };

      const inventory = new ActionInventory({store, $});
      inventory.loadTopics();

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

  describe('postBand', () => {

    it('posts a band data to server and dispatch relevant events to store', () => {
      const $ = {
        ajax: jest.fn(() => ({done: (callback) => callback()}))
      };
      const [topicId, begin, end] = ['TOPIC_ID', 10, 30];

      const inventory = new ActionInventory({$});
      inventory.postBand(topicId, begin, end).then(() => {
        expect($.ajax.mock.calls).toEqual([[{
          url: '/topic/TOPIC_ID/bands',
          type: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          contentType: 'application/json',
          data: '[{"begin":10,"end":30}]'
        }]]);
      });
    });

  });

});
