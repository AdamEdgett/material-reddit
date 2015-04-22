const React = require('react');
const _ = require('lodash');

const Link = require('components/link.jsx');

const List = React.createClass({
  propTypes: {
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape(Link.propTypes)
    )
  },

  render: function() {
    const { links } = this.props;
    const renderedLinks = _.map(links, (link) => <Link key={link.id} {...link} />);

    return (
      <div className='list'>
        {renderedLinks}
      </div>
    );
  }
});

export default List;
