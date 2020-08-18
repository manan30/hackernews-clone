import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const FEED_QUERY = gql`
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

  overflow-y: auto;
`;

function LinksList() {
  const { loading, error, data } = useQuery(FEED_QUERY);

  const updateCache = (store, createVote, linkId) => {
    const newData = store.readQuery({ query: FEED_QUERY });

    const updatedLinks = newData.feed.links.map((link) => {
      if (link.id === linkId) {
        return { ...link, votes: createVote.link.votes };
      }
      return link;
    });

    const updatedData = { feed: { links: updatedLinks } };
    store.writeQuery({ query: FEED_QUERY, updatedData });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <LinksContainer>
      {data.feed.links.map((link, i) => {
        const idx = i;
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            key={idx}
            link={link}
            index={idx + 1}
            updateCache={updateCache}
          />
        );
      })}
    </LinksContainer>
  );
}

LinksList.propTypes = {};

export default LinksList;
