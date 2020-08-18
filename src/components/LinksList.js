import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const LINKS_QUERY = gql`
  query Feed {
    feed {
      links {
        id
        createdAt
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const LinksContainer = styled.div`
  height: calc(100vh - 5rem);
  width: 80%;
  margin: 0 10%;
`;

function LinksList() {
  const { loading, error, data } = useQuery(LINKS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <LinksContainer>
      {data.feed.links.map((link, i) => {
        const idx = i;
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <Link key={idx} link={link} index={idx + 1} />;
      })}
    </LinksContainer>
  );
}

LinksList.propTypes = {};

export default LinksList;
