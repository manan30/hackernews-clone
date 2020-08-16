import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from './Link';

const LINKS_QUERY = gql`
  query Feed {
    feed {
      links {
        id
        description
        url
      }
    }
  }
`;

function LinksList() {
  const { loading, error, data } = useQuery(LINKS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      {data.feed.links.map((link) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link link={link} />
      ))}
    </div>
  );
}

LinksList.propTypes = {};

export default LinksList;
