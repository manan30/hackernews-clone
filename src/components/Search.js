import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Link from './Link';
import { FEED_SEARCH_QUERY } from '../utils/Queries';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [links, setLinks] = useState([]);
  const { query } = useApolloClient();

  const handleSearch = async () => {
    const result = await query({
      query: FEED_SEARCH_QUERY,
      variables: { filter: searchTerm }
    });
    const { links: results } = result.data.feed;
    setLinks(results);
  };

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          id="search"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSearch}>
        OK
      </button>
      {links.map((link, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}

export default Search;
