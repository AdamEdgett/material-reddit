const SubredditTarget = require('route_targets/subreddit.js');

const Routes = {
  '/': {
    target: SubredditTarget,
    '/': 'view',
  },
  '/r/:subreddit': {
    target: SubredditTarget,
    '/': 'view',
    '/:sort': {
      '/': 'view',
      '/:time': 'view'
    }
  },
  '/:sort': {
    target: SubredditTarget,
    '/': 'view'
  }
};

export default Routes;
