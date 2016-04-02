
jest.unmock('../script/Reducer');

import deepFreeze from 'deep-freeze';
import Reducer from '../script/Reducer';

describe('Reducer', () => {

  it('returns empty object if the state is not defined', () => {
    let beforeState;
    let afterState = {};

    const reducer = new Reducer();
    expect(reducer.reduce(beforeState)).toEqual(afterState);
  });

  it('stores fetched topics', () => {
    const beforeState = {};
    const afterState = {
      topics: ['TOPIC_1', 'TOPIC_2']
    };
    const action = {
      type: 'FETCH_TOPICS_RECEIVED',
      topics: ['TOPIC_1', 'TOPIC_2']
    };

    deepFreeze(beforeState, afterState, action);

    const reducer = new Reducer();
    expect(reducer.reduce(beforeState, action)).toEqual(afterState);
  });

});
