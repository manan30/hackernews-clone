import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import useDivClickHandler from '../hooks/useDivClickHandler';
import { AUTH_TOKEN } from '../utils/Constants';

const Container = styled.div`
  display: flex;
  align-items: baseline;

  height: 3rem;
  width: calc(100% - 2rem);
  padding: 1rem;

  background-color: #ff6600;
  color: #fefefe;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 2rem;

  margin-right: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #070707;
  margin: 0 0.5rem;

  ~ span {
    font-size: 1.5rem;
    color: #070707;
  }

  :hover {
    text-decoration: underline;
  }

  :visited {
    color: #070707;
  }
`;

function Header() {
  const { authToken, setAuthToken } = useAuth();
  const history = useHistory();

  const handler = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setAuthToken('');
    history.push('/');
  };

  const divClickHandlers = useDivClickHandler(handler);

  return (
    <Container>
      <Title>Hacker News</Title>
      <div
        style={{
          transform: 'translateY(-0.2rem)',
          display: 'flex',
          alignItems: 'center',
          flex: '1 1 auto'
        }}
      >
        <StyledLink to="/">New</StyledLink>
        <span>|</span>
        <StyledLink to="/create">Submit</StyledLink>
        <div style={{ marginLeft: 'auto' }}>
          {authToken ? (
            <div
              tabIndex={-1}
              role="button"
              style={{ cursor: 'pointer' }}
              {...divClickHandlers}
            >
              Logout
            </div>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Header;
