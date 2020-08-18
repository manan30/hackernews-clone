import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import Link from './Link';
import { FEED_QUERY } from '../utils/Queries';

const LinksContainer = styled.div`
  height: calc(100vh - 5rem);
  width: 80%;
  margin: 0 10%;

  overflow-y: auto;
`;

function LinksList() {
  const { loading, error, data } = useQuery(FEED_QUERY);

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
