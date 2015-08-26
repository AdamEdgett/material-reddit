import React, { Component, PropTypes } from 'react';
import Avaitor from 'aviator';
import _ from 'lodash';
import classNames from 'classnames';

import Sidebar from 'components/sidebar.jsx';
import Icon from 'components/icon.jsx';

const propTypes = {
  subreddits: PropTypes.array,
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarExpanded: false,
    };
  }

  changeSort(sort) {
    const request = Aviator.getCurrentRequest();
    const { matchedRoute, namedParams } = request;

    let route = matchedRoute;
    if (!_.contains(route, '/:sort')) {
      route += '/:sort';
    }

    Avaitor.navigate(route, {
      namedParams: _.defaults( {sort: sort}, namedParams ),
    });
  }

  toggleSidebar() {
    this.setState({
      sidebarExpanded: !this.state.sidebarExpanded,
    });
  }

  render() {
    const { subreddits } = this.props;

    const request = Aviator.getCurrentRequest();
    const currentSort = request.namedParams.sort || 'hot';

    const renderedSorts = _.map(
      ['hot', 'new', 'rising', 'controversial', 'top'],
      (sort) => {
        const classes = {
          'sort': true,
          'current': _.isEqual(sort, currentSort),
        };

        return (
          <div onClick={_.partial(this.changeSort, sort)}
            className={classNames(classes)}
            key={sort}>
            <span>{sort}</span>
          </div>
        );
      }
    );

    return (
      <div className="nav">
        <div className="navbar">
          <div className="top">
            <a className="navicon waves-effect waves-light waves-circle" onClick={this.toggleSidebar.bind(this)}>
              <Icon type="navigation-menu" size="small" />
            </a>
            <a className="logo" href="/">
              <Icon type="reddit" family="fa" />
              <span>reddit</span>
            </a>
            <a className="github-link" href="http://github.com/adamedgett/material-reddit">
              <Icon type="github" family="fa" size="fa-lg" />
            </a>
          </div>

          <div className="bottom">
            <div className="sorts">
              {renderedSorts}
            </div>
          </div>
        </div>
        <Sidebar subreddits={subreddits} expanded={this.state.sidebarExpanded} />
      </div>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
