import React, { Component, PropTypes } from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';

const TIME_RANGES = {
  'hour': 'past hour',
  'day': 'past 24 hours',
  'month': 'past month',
  'year': 'past year',
  'all': 'all time'
};

const propTypes = {
  currentRange: PropTypes.string
};

class TimeSelector extends Component {
  render() {
    const { currentRange } = this.props;
    const request = Avaitor.getCurrentRequest();

    const renderedOptions = _.map(TIME_RANGES, (title, value) => {
      return <option value={value} key={value}>{title}</option>;
    });

    // @TODO fix materialize css syling of selector
    return (
      <select defaultValue={currentRange} onChange={this.changeTime} className='time-selector browser-default'>
        {renderedOptions}
      </select>
    );
  }

  changeTime(event) {
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
  }
}

TimeSelector.propTypes = propTypes;
TimeSelector.defaultProps = { currentRange: 'day' };

export default TimeSelector;
