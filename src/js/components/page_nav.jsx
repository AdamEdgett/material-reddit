import React, { Component, PropTypes } from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';

import Icon from 'components/icon.jsx';

const DEFAULT_COUNT = 25;

const propTypes = {
  before: PropTypes.string,
  after: PropTypes.string
};

class PageNav extends Component {
  render() {
    const { after, before } = this.props;
    const request = Avaitor.getCurrentRequest();

    let prevLink, nextLink;
    if (!_.isEmpty(after)) {
      nextLink = (
        <a className='next btn waves-effect waves-light' onClick={_.partial(this.onNav, {after: after})}>
          Next
          <Icon type='navigation-chevron-right' className='right' />
        </a>
      );
    }

    if (!_.isEmpty(before)) {
      prevLink = (
        <a className='prev btn waves-effect waves-light' onClick={_.partial(this.onNav, {before: before})}>
          <Icon type='navigation-chevron-left' className='left' />
          Prev
        </a>
      );
    }

    return (
      <div className='page-nav'>
        {prevLink}
        {nextLink}
      </div>
    );
  }

  onNav(navParams) {
    const request = Aviator.getCurrentRequest();
    const { matchedRoute, namedParams } = request;

    Avaitor.navigate(matchedRoute, {
      namedParams: namedParams,
      queryParams: _.extend(navParams, { count: DEFAULT_COUNT })
    });
  }
}

PageNav.propTypes = propTypes;

export default PageNav;
