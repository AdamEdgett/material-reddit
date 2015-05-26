import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

const Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  render: function() {
    const { type, size, className, onClick } = this.props;

    let classes = {};
    classes[className] = !_.isEmpty(className);
    classes[type] = true;
    classes[`mdi-${type}`] = true;
    classes[`${size}`] = !_.isEmpty(size);

    return <i className={classnames(classes)} onClick={onClick} />;
  }
});

export default Icon;
