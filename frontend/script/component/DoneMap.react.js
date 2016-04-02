
import React from 'react';

const DoneMap = React.createClass({
  getStyleSpec: function (band, total) {
    let left = band.begin / total * 100;
    let width = (band.end - band.begin + 1) / total * 100;
    return {
      left: left.toFixed(2) + '%',
      width: width.toFixed(2) + '%'
    };
  },

  render: function () {
    let bands = this.props.bands;
    let total = this.props.total;
    return (
      <div className="topic__progress-bar">
        {bands.map(band =>
          <div className="topic__progress-band"
               style={this.getStyleSpec(band, total)}></div>
        )}
      </div>
    );
  }
});

module.exports = DoneMap;
