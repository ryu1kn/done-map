
import React from 'react';
import DoneMap from './DoneMap.react';

const TopicItem = React.createClass({
  convertToPercent: function (num) {
    var percent = num * 100;
    return num > 100 ? 100 : percent.toFixed(1);
  },

  calcBandSum: function (bands) {
    return (bands || []).reduce((sum, band) => {
      return sum + (band.end - band.begin + 1);
    }, 0);
  },

  getProgressPercent: function (topic) {
    return this.convertToPercent(this.calcBandSum(topic.bands) / topic.total);
  },

  render: function () {
    let index = this.props.index;
    let topic = this.props.topic;
    return (
      <div className="topic">
        <div className="topic__index">{index}.</div>
        <div className="topic__title">{topic.title || ''}</div>
        <DoneMap total={topic.total} bands={topic.bands} />
        <div className="topic__progress-stat">{this.getProgressPercent(topic)}%</div>
      </div>
    );
  }
});

module.exports = TopicItem;
