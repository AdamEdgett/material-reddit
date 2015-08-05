import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';

import Icon from 'components/icon.jsx';

const propTypes = {
  domain: PropTypes.string,
  subreddit: PropTypes.string,
  subredditId: PropTypes.string,
  id: PropTypes.string,
  author: PropTypes.string,
  numComments: PropTypes.number,
  score: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  createdUtc: PropTypes.number,
  permalink: PropTypes.string,
  thumbnail: PropTypes.string
};

class Link extends Component {
  render() {
    const { url, title, createdUtc, author, subreddit, permalink, thumbnail, numComments } = this.props;

    const created = moment.unix(createdUtc);

    let thumbnailClasses = {
      'thumbnail': true
    };

    let renderedThumbnail;
    if (_.contains(['default', 'self', 'nsfw'], thumbnail) || _.isEmpty(thumbnail)) {
      if (!_.isEmpty(thumbnail)) thumbnailClasses[thumbnail] = true;
      renderedThumbnail = <Icon type='reddit' family='fa' size='fa-2x' className='placeholder-logo'/>;
    }
    else {
      renderedThumbnail = <img src={thumbnail} />;
    }

    return (
      <div className='link-container card'>
        <div className='thumbnail-container'>
          <a href={url} className={classNames(thumbnailClasses)}>
            {renderedThumbnail}
          </a>
        </div>
        <div className='content'>
          <a href={url} className='link'>{title}</a>
          <div className='info'>
            <div className='description'>
              <span className='timestamp' title={created.toString()}>{`Submitted ${created.fromNow()}`}</span>
              <span className='author'> by <a href={`http://www.reddit.com/u/${author}`}>{author}</a></span>
              <span className='subreddit'> on <a href={`/r/${subreddit}`}>{subreddit}</a></span>
            </div>
            <div className='controls'>
              <a href={`http://www.reddit.com${permalink}`} className='comments'>
                <span className='count'>{numComments}</span>
                <Icon type='communication-comment' />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Link.propTypes = propTypes;

export default Link;
