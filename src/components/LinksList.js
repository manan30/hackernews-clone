import { useQuery } from '@apollo/client';
import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION
} from '../utils/Queries';
import Link from './Link';
import { LINKS_PER_PAGE } from '../utils/Constants';

const LinksContainer = styled.div`
  height: calc(100vh - 5rem);
  width: 80%;
  margin: 0 10%;

  overflow-y: auto;
`;

function LinksList() {
  const { pathname } = useLocation();
  const { params } = useRouteMatch();
  const history = useHistory();

  const isNewPage = pathname.includes('new');
  const pageIndex = params.page ? (params.page - 1) * LINKS_PER_PAGE : 0;

  const queryVars = () => {
    const page = parseInt(params.page, 10);
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? 'createdAt_DESC' : null;
    return { first, skip, orderBy };
  };

  const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { ...queryVars() }
  });

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

  const linksToRender = (() => {
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  })();

  const handleNext = () => {
    const page = parseInt(params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  };

  const handlePrev = () => {
    const page = parseInt(params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  };

  return (
    <LinksContainer>
      {linksToRender.map((link, i) => {
        const idx = i;
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link key={idx} link={link} index={idx + pageIndex} />
        );
      })}
      {isNewPage && (
        <div>
          <button type="button" onClick={handlePrev}>
            Previous
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </LinksContainer>
  );
}

LinksList.propTypes = {};

export default LinksList;
