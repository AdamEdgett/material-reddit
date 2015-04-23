const React = require('react');
const Avaitor = require('aviator');
const _ = require('lodash');
const classnames = require('classnames');

const Icon = require('components/icon.jsx');

const Nav = React.createClass({
  render: function() {
    const request = Aviator.getCurrentRequest();
    const currentSort = request.namedParams.sort || 'hot';

    const renderedSorts = _.map(
      ['hot', 'new', 'rising', 'controversial', 'top'],
      (sort) => {
        const classes = {
          'sort': true,
          'current': _.isEqual(sort, currentSort)
        };

        return (
          <div onClick={_.partial(this.changeSort, sort)}
            className={classnames(classes)}
            key={sort}>
            <span>{sort}</span>
          </div>
        );
      }
    );

    return (
      <div className='nav'>
        <div className='top'>
          <Icon type='navicon' size='lg' />
          <a className='logo' href='/'>
            <Icon type='reddit' />
            <span>reddit</span>
          </a>
          <a className='github-link' href='http://github.com/adamedgett/material-reddit'>
            <Icon type='github' size='lg' />
          </a>
        </div>

        <div className='bottom'>
          <div className='sorts'>
            {renderedSorts}
          </div>
        </div>
      </div>
    );
  },

  changeSort: function(sort) {
    const request = Aviator.getCurrentRequest();
    const { matchedRoute, namedParams, queryParams } = request;

    Avaitor.navigate(matchedRoute, {
      namedParams: _.defaults( {sort: sort}, namedParams )
    });
  }
});

export default Nav;
