const React = require('react');
const _ = require('lodash');
const moment = require('moment');

const Link = React.createClass({
  propTypes: {
    domain: React.PropTypes.string,
    subreddit: React.PropTypes.string,
    subredditId: React.PropTypes.string,
    id: React.PropTypes.string,
    author: React.PropTypes.string,
    numComments: React.PropTypes.number,
    score: React.PropTypes.number,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    createdUtc: React.PropTypes.number,
    permalink: React.PropTypes.string,
  },

  render: function() {
    const { url, title, createdUtc, author, subreddit } = this.props;

    const created = moment.unix(createdUtc);
    return (
      <div className='link'>
        <a href={url}>{title}</a>
        <div className='description'>
          <span className='timestamp' title={created.toString()}>{`Submitted ${created.fromNow()}`}</span>
          <span className='author'> by <a href={`/u/${author}`}>{author}</a></span>
          <span className='subreddit'> on <a href={`/r/${subreddit}`}>{subreddit}</a></span>
        </div>
      </div>
    );
  }
});

export default Link;
