const React = require('react');
const Avaitor = require('aviator');
const _ = require('lodash');
const classnames = require('classnames');

const Sidebar = React.createClass({
  propTypes: {
    subreddits: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        displayName: React.PropTypes.string,
        title: React.PropTypes.string,
        url: React.PropTypes.string
      })
    ),
    expanded: React.PropTypes.bool
  },

  render: function() {
    const { subreddits, expanded } = this.props;

    const request = Aviator.getCurrentRequest();
    const currentSubreddit = request.namedParams.subreddit;

    const subredditList = _.map(subreddits, (subreddit) => {
      const subredditClasses = {
        'subreddit': true,
        'current': _.isEqual(subreddit.displayName, currentSubreddit)
      };

      return (
        <div className={classnames(subredditClasses)} key={subreddit.displayName}>
          <a href={subreddit.url}>{subreddit.displayName}</a>
        </div>
      );
    });

    const classes = {
      'sidebar': true,
      'expanded': expanded
    };

    return (
      <div className={classnames(classes)}>
        {subredditList}
      </div>
    );
  }
});

export default Sidebar;
