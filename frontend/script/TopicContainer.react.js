
import React from 'react';
import TopicItem from './TopicItem.react';  // eslint-disable-line no-unused-vars

const TopicContainer = React.createClass({
  render: function () {
    var topics = this.props.topics;
    return (
      <div>
        {topics.map((topic, index) =>
          <TopicItem topic={topic} index={index + 1} />
        )}
      </div>
    );
  }
});

module.exports = TopicContainer;
