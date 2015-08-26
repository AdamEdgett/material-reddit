import React, { Component, PropTypes } from 'react';

const propTypes = {
  size: PropTypes.oneOf(['big', 'regular', 'small'])
};

class Loader extends Component {
  render() {
    const { size } = this.props;

    return (
      <div className='loader'>
        <div className={`preloader-wrapper ${size} active`}>
          <div className={`spinner-layer spinner-red-only`}>
            <div className='circle-clipper left'>
              <div className='circle'></div>
            </div>
            <div className='gap-patch'>
              <div className='circle'></div>
            </div>
            <div className='circle-clipper right'>
              <div className='circle'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Loader.propTypes = propTypes;
Loader.defaultProps = { size: 'regular' };

export default Loader;
