
import React from 'react';
import TopicContainer from './TopicContainer.react';
import BandForm from './BandForm.react';

const DoneMapApp = React.createClass({
  getInitialState: function () {
    this._actionInventory = this.props.actionInventory;
    this._store = this.props.store;
    this._store.subscribe(this._onStoreUpdated);
    return {topics: []};
  },

  componentDidMount: function () {
    this._actionInventory.loadTopics();
  },

  _onStoreUpdated: function () {
    this.setState({
      topics: this._store.getState().topics
    });
  },

  postBand: function (index, begin, end) {
    const topicId = this.state.topics[index].id;
    this._actionInventory.postBand(topicId, begin, end)
      .then(() => {
        location.reload();
      });
  },

  render: function () {
    return (
      <div className="donebox container">
        <BandForm topics={this.state.topics} postBand={this.postBand} />
        <TopicContainer topics={this.state.topics} />
      </div>
    );
  }
});

module.exports = DoneMapApp;
