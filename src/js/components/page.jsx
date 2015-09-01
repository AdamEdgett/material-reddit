import React, { Component, PropTypes } from 'react/addons';
import _ from 'lodash';

import Nav from 'components/page/nav.jsx';

const propTypes = {
  subreddits: PropTypes.array,
  childProps: PropTypes.object,
};

class Page extends Component {
  static getMountNode() {
    return document.querySelector('#content-anchor');
  }

  renderChildren() {
    const { childProps } = this.props;
    const cloneWithProps = _.partial(React.addons.cloneWithProps, _, childProps);

    if (_.isArray(this.props.children)) {
      return _.map(this.props.children, (child) => {
        cloneWithProps(child);
      });
    }

    return cloneWithProps(this.props.children);
  }

  render() {
    const { subreddits } = this.props;

    return (
      <div>
        <Nav subreddits={subreddits} />
        {this.renderChildren()}
      </div>
    );
  }
}

Page.propTypes = propTypes;

export default Page;
