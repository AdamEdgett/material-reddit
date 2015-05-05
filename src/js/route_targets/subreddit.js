const React = require('react');
const reqwest = require('reqwest');
const _ = require('lodash');
const humps = require('humps');

const Page = require('components/page.jsx');
const List = require('components/list.jsx');

const SubredditTarget = {
  view: function(request) {
    const { subreddit, sort, time } = request.namedParams;
    const { count, before, after } = request.queryParams;

    var component = React.render(
      <Page>
        <List />
      </Page>,
      Page.getMountNode()
    );

    reqwest({
      url: 'https://www.reddit.com/subreddits.json',
      method: 'get',
      type: 'json',
      crossOrigin: true,
      success: function (resp) {
        component.setProps({
          subreddits: humps.camelizeKeys(_.pluck(resp.data.children, 'data'))
        });
      }
    });

    let requestUrl = 'https://www.reddit.com/';
    if (!_.isEmpty(subreddit)) {
      requestUrl += `r/${subreddit}/`;
    }
    if (!_.isEmpty(sort)) {
      requestUrl += `${sort}`;
    }
    requestUrl += '.json';

    let data = {};

    if (time) {
      data.t = time;
    }

    if (count) {
      data.count = count;
    }

    if (after) {
      data.after = after;
    }
    else if (before) {
      data.before = before;
    }

    reqwest({
      url: requestUrl,
      method: 'get',
      type: 'json',
      crossOrigin: true,
      data: data,
      success: function (resp) {
        component.setProps({
          childProps: {
            links: humps.camelizeKeys(_.pluck(resp.data.children, 'data')),
            before: humps.camelizeKeys(resp.data.before),
            after: humps.camelizeKeys(resp.data.after)
          }
        });
      }
    });
  }
};

export default SubredditTarget;
