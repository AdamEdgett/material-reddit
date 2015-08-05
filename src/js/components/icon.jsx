import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    family: React.PropTypes.string,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      family: 'mdi'
    };
  },

  render: function() {
    const { type, family, size, className, onClick } = this.props;

    let classes = {};
    classes[className] = !_.isEmpty(className);
    classes[type] = true;
    classes[family] = true;
    classes[`${family}-${type}`] = true;
    classes[`${size}`] = !_.isEmpty(size);

    return <i className={classNames(classes)} onClick={onClick} />;
  }
});

export default Icon;
