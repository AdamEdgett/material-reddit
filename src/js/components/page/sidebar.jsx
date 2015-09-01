import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const propTypes = {
  subreddits: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  expanded: PropTypes.bool,
};

class Sidebar extends Component {
  render() {
    const { subreddits, expanded } = this.props;

    const request = Aviator.getCurrentRequest();
    const currentSubreddit = request.namedParams.subreddit;

    const subredditList = _.map(subreddits, (subreddit) => {
      const subredditClasses = {
        'subreddit': true,
        'current': _.isEqual(subreddit.displayName, currentSubreddit),
      };

      return (
        <div className={classNames(subredditClasses)} key={subreddit.displayName}>
          <a href={subreddit.url}>{subreddit.displayName}</a>
        </div>
      );
    });

    const classes = {
      'sidebar': true,
      'expanded': expanded,
    };

    return (
      <div className={classNames(classes)}>
        {subredditList}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

export default Sidebar;
