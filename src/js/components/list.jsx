const React = require('react');
const Avaitor = require('aviator');
const _ = require('lodash');
const classnames = require('classnames');

const Link = require('components/link.jsx');

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
    )
  },

  render: function() {
    const { links } = this.props;
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

    return (
      <div className='list'>
        {timeSelector}
        {renderedLinks}
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
});

export default List;
