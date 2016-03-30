
import $ from 'jquery';
import React from 'react';
import TopicContainer from './TopicContainer.react';
import BandForm from './BandForm.react';

const DoneMapApp = React.createClass({
  _loadTopics: function () {
    $.get('/topics', topics => {
      this.setState({topics});
    });
  },

  getInitialState: function () {
    return {topics: []};
  },

  componentDidMount: function () {
    this._loadTopics();   // TODO: Move this to store
  },

  render: function () {
    return (
      <div className="donebox container">
        <BandForm topics={this.state.topics} />
        <TopicContainer topics={this.state.topics} />
      </div>
    );
  }
});

module.exports = DoneMapApp;
