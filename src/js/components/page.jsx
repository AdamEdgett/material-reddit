const React = require('react/addons');
const _ = require('lodash');

const Nav = require('components/nav.jsx');

const Page = React.createClass({
  propTypes: {
    childProps: React.PropTypes.object
  },

  renderChildren: function() {
    const cloneWithProps = _.partial(React.addons.cloneWithProps, _, this.props.childProps);

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
    return (
      <div>
        <Nav />
        {this.renderChildren()}
      </div>
    );
  }
});

export default Page;
