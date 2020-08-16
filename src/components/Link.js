import React from 'react';
import PropTypes from 'prop-types';

function Link({ link }) {
  return (
    <div>
      {link.description}
      {link.url}
    </div>
  );
}

Link.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string
  })
};

Link.defaultProps = {
  link: { description: '', url: '' }
};

export default Link;
