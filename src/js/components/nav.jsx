const React = require('react');

const Icon = require('components/icon.jsx');

const Nav = React.createClass({
  render: function() {
    return (
      <div className='nav'>
        <div className='top'>
          <Icon type='navicon' size='lg' />
          <a className='logo' href='/'>
            <Icon type='reddit' />
            <span>reddit</span>
          </a>
          <a className='github-link' href='http://github.com/adamedgett/material-reddit'>
            <Icon type='github' size='lg' />
          </a>
        </div>

        <div className='bottom'>
          <div className='sorts'>
            <a href='/hot'>hot</a>
            <a href='/new'>new</a>
            <a href='/rising'>rising</a>
            <a href='/controversial'>controversial</a>
            <a href='/top'>top</a>
            <a href='/guilded'>guilded</a>
          </div>
        </div>
      </div>
    );
  }
});

export default Nav;
