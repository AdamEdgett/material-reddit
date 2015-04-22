const React = require('react');
const reqwest = require('reqwest');
const _ = require('lodash');
const humps = require('humps');

const Page = require('components/page.jsx');
const List = require('components/list.jsx');

window.onload = function () {
  const documentRoot = document.querySelector('#content-anchor');

  var component = React.render(
    <Page>
      <List />
    </Page>,
    documentRoot
  );

  reqwest({
    url: 'https://www.reddit.com/.json',
    method: 'get',
    type: 'json',
    crossOrigin: true,
    success: function (resp) {
      component.setProps({
        childProps: {
          links: humps.camelizeKeys(_.pluck(resp.data.children, 'data'))
        }
      });
    }
  });
};
