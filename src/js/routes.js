const SubredditTarget = require('route_targets/subreddit.js');

const Routes = {
  '/': {
    target: SubredditTarget,
    '/': 'view',
  },
  '/:sort': {
    target: SubredditTarget,
    '/': 'view'
  },
  '/r': {
    target: SubredditTarget,
    '/:subreddit': {
      '/': 'view',
      '/:sort': {
        '/': 'view',
        '/:time': 'view'
      }
    }
  }
};

export default Routes;
