import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 2rem);
  padding: 1rem;
  margin-top: 1rem;

  border-radius: 0.5rem;
  background-color: #fefefe;

  transition: all 0.5s;

  :hover {
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  }
`;

function Link({ link }) {
  return (
    <Container>
      <span style={{ fontSize: '1rem' }}>{link.description}</span>
      <span style={{ fontSize: '0.8rem', color: '#95959d' }}>
        &nbsp;&nbsp;&nbsp;&nbsp;({link.url})
      </span>
    </Container>
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
