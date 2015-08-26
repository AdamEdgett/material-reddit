const React = require('react');
const reqwest = require('reqwest');
const _ = require('lodash');
const humps = require('humps');

const Page = require('components/page.jsx');
const List = require('components/list.jsx');

const SubredditTarget = {
  view(request) {
    const { subreddit, sort, time } = request.namedParams;
    const { count, before, after } = request.queryParams;

    let subreddits;

    let component = React.render(
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
      success(resp) {
        subreddits = humps.camelizeKeys(_.pluck(resp.data.children, 'data'));

        component = React.render(
          <Page subreddits={subreddits}>
            <List {...component.props.children.props}/>
          </Page>,
          Page.getMountNode()
        );
      },
    });

    let requestUrl = 'https://www.reddit.com/';
    if (!_.isEmpty(subreddit)) {
      requestUrl += `r/${subreddit}/`;
    }
    if (!_.isEmpty(sort)) {
      requestUrl += `${sort}`;
    }
    requestUrl += '.json';

    const data = {};

    if (time) {
      data.t = time;
    }

    if (count) {
      data.count = count;
    }

    if (after) {
      data.after = after;
    } else if (before) {
      data.before = before;
    }

    reqwest({
      url: requestUrl,
      method: 'get',
      type: 'json',
      crossOrigin: true,
      data: data,
      success(resp) {
        const links = humps.camelizeKeys(_.pluck(resp.data.children, 'data'));
        const beforeId = humps.camelizeKeys(resp.data.before);
        const afterId = humps.camelizeKeys(resp.data.after);

        component = React.render(
          <Page {...component.props}>
            <List links={links} before={beforeId} after={afterId} />
          </Page>,
          Page.getMountNode()
        );
      },
    });
  },
};

export default SubredditTarget;
