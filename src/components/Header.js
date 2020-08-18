import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/Constants';

function Header() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  return (
    <div>
      <div>
        <div>Hacker News</div>
        <Link to="/">New</Link>
        <div>|</div>
        <Link to="/create">Create</Link>
        {authToken ? (
          <div
            tabIndex={-1}
            role="button"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push('/');
            }}
            onKeyUp={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push('/');
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
