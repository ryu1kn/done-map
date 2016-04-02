
import React from 'react';

const BandForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var index = parseInt(this.refs.topicIndex.value.trim());
    var begin = parseInt(this.refs.bandBegin.value.trim());
    var end = parseInt(this.refs.bandEnd.value.trim());

    if (!this.validateFormData(index, begin, end)) {
      return;
    }
    this.props.postBand(index - 1, begin, end);
  },

  validateFormData: function (index, begin, end) {
    return [index, begin, end].reduce(function (prev, value) {
      return prev && !isNaN(value);
    }, true);
  },

  render: function () {
    return (
      <form id="band-register" onSubmit={this.handleSubmit}>
        <div># <input name="topic-index" type="number" ref="topicIndex" /></div>
        <div>begin: <input name="band-begin" type="number" ref="bandBegin" /></div>
        <div>end: <input name="band-end" type="number" ref="bandEnd" /></div>
        <input name="register" type="submit" />
      </form>
    );
  }
});

module.exports = BandForm;
