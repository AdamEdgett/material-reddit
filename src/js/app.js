const React = require('react');
const reqwest = require('reqwest');
const _ = require('lodash');
const humps = require('humps');

const Page = require('components/page.jsx');
const List = require('components/list.jsx');

window.onload = function () {
  const documentRoot = document.querySelector('#content-anchor');

  var component = React.render(<List />, documentRoot);

  reqwest({
    url: 'https://www.reddit.com/.json',
    method: 'get',
    type: 'json',
    crossOrigin: true,
    success: function (resp) {
      component.setProps({
        links: humps.camelizeKeys(_.pluck(resp.data.children, 'data'))
      });
    }
  });
};
