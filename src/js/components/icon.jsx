import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const propTypes = {
  type: PropTypes.string.isRequired,
  family: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  family: 'mdi',
};

class Icon extends Component {
  render() {
    const { type, family, size, className, onClick } = this.props;

    const classes = {
      [className]: !_.isEmpty(className),
      [type]: true,
      [family]: true,
      [`${family}-${type}`]: true,
      [`${size}`]: !_.isEmpty(size),
    };

    return <i className={classNames(classes)} onClick={onClick} />;
  }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
