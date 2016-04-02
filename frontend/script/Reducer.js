
export default class Reducer {
  reduce(state, action) {
    if (typeof state === 'undefined') return {};

    switch (action.type) {
    case 'FETCH_TOPICS_RECEIVED':
      return {
        topics: action.topics
      };
    default:
      return state;
    }
  }
}
