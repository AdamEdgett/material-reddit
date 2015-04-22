const React = require('react');

const Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  render: function() {
    const { type } = this.props;
    return <i className={`fa fa-${type}`} />;
  }
});

export default Icon;
