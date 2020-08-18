import React, { useState } from 'react';
import Link from './Link';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [links, setLinks] = useState([]);

  const handleSearch = () => {};
  return (
    <div>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="button" onClick={handleSearch}>
          OK
        </button>
      </div>
      {links.map((link, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}

export default Search;
