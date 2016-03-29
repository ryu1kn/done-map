// TODO: Refactoring
import $ from 'jquery';
import React from 'react';

const BandForm = React.createClass({
  // TODO: Move this to Action
  handleSubmit: function (e) {
    e.preventDefault();

    var index = parseInt(this.refs.topicIndex.getDOMNode().value.trim());
    var begin = parseInt(this.refs.bandBegin.getDOMNode().value.trim());
    var end = parseInt(this.refs.bandEnd.getDOMNode().value.trim());

    if (!this.validateFormData(index, begin, end)) {
      return;
    } else {
      var onSuccess = function () { location.reload(); };
      this.postBand(index, begin, end, onSuccess);
    }
  },

  postBand: function (index, begin, end, successCallback) {
    $.ajax({
      url: '/topic/' + this.props.topics[index - 1].id + '/bands',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      contentType: 'application/json',
      data: JSON.stringify([{
        begin: begin,
        end: end
      }])
    })
    .done(successCallback);
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
