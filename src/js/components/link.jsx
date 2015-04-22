const React = require('react');
const _ = require('lodash');
const moment = require('moment');

const Icon = require('components/icon.jsx');

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
    thumbnail: React.PropTypes.string
  },

  render: function() {
    const { url, title, createdUtc, author, subreddit, permalink, thumbnail, numComments } = this.props;

    const created = moment.unix(createdUtc);
    const thumbnailSrc = _.isEqual(thumbnail, 'self') ?  '' : thumbnail;
    return (
      <div className='link-container card'>
        <div className='thumbnail'>
          <img src={thumbnailSrc} />
        </div>
        <div className='content'>
          <a href={url} className='link'>{title}</a>
          <div className='info'>
            <div className='description'>
              <span className='timestamp' title={created.toString()}>{`Submitted ${created.fromNow()}`}</span>
              <span className='author'> by <a href={`http://www.reddit.com/u/${author}`}>{author}</a></span>
              <span className='subreddit'> on <a href={`http://www.reddit.com/r/${subreddit}`}>{subreddit}</a></span>
            </div>
            <div className='controls'>
              <a href={`http://www.reddit.com${permalink}`} className='comments'>
                <span className='count'>{numComments}</span>
                <Icon type='comment' />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Link;
