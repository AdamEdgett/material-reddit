import React, { Component, PropTypes } from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';

import Loader from 'components/loader.jsx';
import Link from 'components/subreddit/link.jsx';
import TimeSelector from 'components/subreddit/time_selector.jsx';
import PageNav from 'components/subreddit/page_nav.jsx';

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape(Link.propTypes)
  ),
  before: PropTypes.string,
  after: PropTypes.string,
};

class List extends Component {
  render() {
    const { links, after, before } = this.props;

    if (_.isEmpty(links)) {
      return (
        <div className="list">
          <Loader size="big" />
        </div>
      );
    }

    const request = Avaitor.getCurrentRequest();

    let timeSelector;
    if (_.isEqual(request.namedParams.sort, 'top')) {
      const currentRange = request.namedParams.time;
      timeSelector = <TimeSelector currentRange={currentRange} />;
    }

    const renderedLinks = _.map(links, (link) => <Link key={link.id} {...link} />);

    return (
      <div className="list">
        {timeSelector}
        {renderedLinks}
        <PageNav before={before} after={after} />
      </div>
    );
  }
}

List.propTypes = propTypes;

export default List;
