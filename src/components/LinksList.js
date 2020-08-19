import { useQuery } from '@apollo/client';
import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION
} from '../utils/Queries';
import Link from './Link';

const LinksContainer = styled.div`
  height: calc(100vh - 5rem);
  width: 80%;
  margin: 0 10%;

  overflow-y: auto;
`;

function LinksList() {
  const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY);

  const subscribeToNewLinks = useCallback(() => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newLink } = subscriptionData.data;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;

        return {
          ...prev,
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            // eslint-disable-next-line no-underscore-dangle
            __typename: prev.feed.__typename
          }
        };
      }
    });
  }, [subscribeToMore]);

  const subscribeToNewVotes = useCallback(() => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  }, [subscribeToMore]);

  useEffect(() => {
    subscribeToNewLinks();
    subscribeToNewVotes();
  }, [subscribeToNewLinks, subscribeToNewVotes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <LinksContainer>
      {data.feed.links.map((link, i) => {
        const idx = i;
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link key={idx} link={link} index={idx + 1} />
        );
      })}
    </LinksContainer>
  );
}

LinksList.propTypes = {};

export default LinksList;
