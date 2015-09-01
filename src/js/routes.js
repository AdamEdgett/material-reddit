import SubredditTarget from 'route_targets/subreddit.js';

const Routes = {
  '/r': {
    target: SubredditTarget,
    '/:subreddit': {
      '/': 'view',
      '/:sort': {
        '/': 'view',
        '/:time': 'view'
      }
    }
  },
  '/': {
    target: SubredditTarget,
    '/': 'view'
  },
  '/:sort': {
    target: SubredditTarget,
    '/': 'view',
    '/:time': 'view'
  }
};

export default Routes;
