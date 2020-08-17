import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <div>
        <div>Hacker News</div>
        <Link to="/">New</Link>
        <div>|</div>
        <Link to="/create">Create</Link>
      </div>
    </div>
  );
}

export default Header;
