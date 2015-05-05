import React from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';
import classnames from 'classnames';

import Link from 'components/link.jsx';

const TIME_RANGES = {
  'hour': 'past hour',
  'day': 'past 24 hours',
  'month': 'past month',
  'year': 'past year',
  'all': 'all time'
};

const List = React.createClass({
  propTypes: {
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape(Link.propTypes)
    ),
    before: React.PropTypes.string,
    after: React.PropTypes.string
  },

  render: function() {
    const { links, after, before } = this.props;
    const request = Avaitor.getCurrentRequest();

    let timeSelector;
    if (_.isEqual(request.namedParams.sort, 'top')) {
      const currentRange = request.namedParams.time || 'day';

      const renderedOptions = _.map(TIME_RANGES, (title, value) => {
        return <option value={value} key={value}>{title}</option>;
      });

      timeSelector = (
        <select defaultValue={currentRange} onChange={this.changeTime} className='time-selector'>
          {renderedOptions}
        </select>
      );
    }

    const renderedLinks = _.map(links, (link) => <Link key={link.id} {...link} />);

    let prevLink, nextLink;
    if (!_.isEmpty(after)) {
      nextLink = <a className='next' onClick={_.partial(this.onNav, {after: after})}>Next</a>
    }

    if (!_.isEmpty(before)) {
      prevLink = <a className='prev' onClick={_.partial(this.onNav, {before: before})}>Prev</a>
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
  },

  changeTime: function(event) {
    const selectedTime = event.target.value;
    const request = Aviator.getCurrentRequest();
    const { matchedRoute, namedParams, queryParams } = request;

    let route = matchedRoute;
    if (!_.contains(route, '/:time')) {
      route += '/:time';
    }

    Avaitor.navigate(route, {
      namedParams: _.defaults( {time: selectedTime}, namedParams )
    });
  },

  onNav: function(navParams) {
    const request = Aviator.getCurrentRequest();
    const { matchedRoute, namedParams } = request;

    Avaitor.navigate(matchedRoute, {
      namedParams: namedParams,
      queryParams: navParams,
    });
  }
});

export default List;
