const React = require('react/addons');
const _ = require('lodash');

const Nav = require('components/nav.jsx');

const Page = React.createClass({
  statics: {
    getMountNode: function() {
      return document.querySelector('#content-anchor');
    }
  },

  propTypes: {
    subreddits: React.PropTypes.array,
    childProps: React.PropTypes.object
  },

  renderChildren: function() {
    const { childProps } = this.props;
    const cloneWithProps = _.partial(React.addons.cloneWithProps, _, childProps);

    if (_.isArray(this.props.children)) {
      return _.map(this.props.children, (child) => {
        cloneWithProps(child);
      });
    }
    else {
      return cloneWithProps(this.props.children);
    }
  },

  render: function() {
    const { subreddits } = this.props;

    return (
      <div>
        <Nav subreddits={subreddits} />
        {this.renderChildren()}
      </div>
    );
  }
});

export default Page;
