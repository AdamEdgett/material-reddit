const React = require('react');
const _ = require('lodash');
const classnames = require('classnames');

const Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    className: React.PropTypes.string
  },

  render: function() {
    const { type, size, className } = this.props;

    let classes = {};
    classes[className] = !_.isEmpty(className);
    classes[type] = true;
    classes[`fa fa-${type}`] = true;
    classes[`fa-${size}`] = !_.isEmpty(size);

    return <i className={classnames(classes)} />;
  }
});

export default Icon;
