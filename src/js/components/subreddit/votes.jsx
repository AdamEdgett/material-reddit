import React, { Component, PropTypes } from 'react';

const propTypes = {
  score: PropTypes.number,
};

class Votes extends Component {
  render() {
    const { score } = this.props;

    return (
      <div className="score-container">
        <div className="score">
          {score}
        </div>
      </div>
    );
  }
}

Votes.propTypes = propTypes;

export default Votes;
