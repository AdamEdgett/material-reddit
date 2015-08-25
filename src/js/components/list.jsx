import React, { Component, PropTypes } from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';

import Icon from 'components/icon.jsx';
import Link from 'components/link.jsx';
import TimeSelector from 'components/time_selector.jsx';

const DEFAULT_COUNT = 25;

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape(Link.propTypes)
  ),
  before: PropTypes.string,
  after: PropTypes.string
};

class List extends Component {
  render() {
    const { links, after, before } = this.props;
    const request = Avaitor.getCurrentRequest();

    let timeSelector;
    if (_.isEqual(request.namedParams.sort, 'top')) {
      const currentRange = request.namedParams.time;
      timeSelector = <TimeSelector currentRange={currentRange} />;
    }

    const renderedLinks = _.map(links, (link) => <Link key={link.id} {...link} />);

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
      <div className='list'>
        {timeSelector}
        {renderedLinks}
        <div className='page-nav'>
          {prevLink}
          {nextLink}
        </div>
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

List.propTypes = propTypes;

export default List;
