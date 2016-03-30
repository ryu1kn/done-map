
jest.unmock('../script/TopicContainer.react');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TopicContainer from '../script/TopicContainer.react';
import TopicItem from '../script/TopicItem.react';

describe('TopicContainer', () => {

  it('has list of TopicItem', () => {
    const renderer = TestUtils.createRenderer();
    const topics = ['TOPIC_1', 'TOPIC_2'];
    renderer.render(<TopicContainer topics={topics} />);

    var result = renderer.getRenderOutput();
    expect(result).toEqual(
      <div>
        <TopicItem topic="TOPIC_1" index={1} />
        <TopicItem topic="TOPIC_2" index={2} />
      </div>
    );
  });

});
