const React = require('react');
const reqwest = require('reqwest');
const _ = require('lodash');
const humps = require('humps');

const Page = require('components/page.jsx');
const List = require('components/list.jsx');

const SubredditTarget = {
  view: function(request) {
    const { subreddit, sort, time } = request.namedParams;

    var component = React.render(
      <Page>
        <List />
      </Page>,
      Page.getMountNode()
    );

    let requestUrl = 'https://www.reddit.com/';
    if (!_.isEmpty(subreddit)) {
      requestUrl += `r/${subreddit}/`;
    }
    if (!_.isEmpty(sort)) {
      requestUrl += `${sort}`;
    }
    requestUrl += '.json';

    reqwest({
      url: requestUrl,
      method: 'get',
      type: 'json',
      crossOrigin: true,
      data: { t: time },
      success: function (resp) {
        component.setProps({
          childProps: {
            links: humps.camelizeKeys(_.pluck(resp.data.children, 'data'))
          }
        });
      }
    });
  }
};

export default SubredditTarget;
