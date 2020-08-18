import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { timeDifferenceForDate } from '../utils/Constants';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Container = styled.div`
  width: calc(100% - 2rem);
  padding: 1rem;
  margin-top: 1rem;

  border-radius: 0.5rem;
  background-color: #fefefe;

  transition: all 0.5s;

  :hover {
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  }
`;

const UpvoteButton = styled.div`
  height: 0.8rem;
  width: 0.8rem;

  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;

  span {
    font-size: '0.8rem';
  }
`;

function Link({ link, index }) {
  const [vote, data] = useMutation(VOTE_MUTATION);
  const { authToken } = useAuth();

  const clickHandler = () => {
    vote({ variables: { linkId: link.id } });
  };

  return (
    <Container>
      <Row style={{ marginBottom: '0.5rem' }}>
        <span>{index}.&nbsp;&nbsp;</span>
        {authToken && (
          <UpvoteButton onClick={clickHandler}>b&nbsp;&nbsp;</UpvoteButton>
        )}
        <span>&nbsp;{link.description}</span>
        <span style={{ fontSize: '0.6rem', color: '#95959d' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;({link.url})
        </span>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <span style={{ fontSize: '0.6rem' }}>{link.votes.length} votes</span>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <span style={{ fontSize: '0.6rem' }}>
          by {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
        </span>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <span style={{ fontSize: '0.6rem' }}>
          {timeDifferenceForDate(link.createdAt)}
        </span>
      </Row>
    </Container>
  );
}

Link.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    votes: PropTypes.arrayOf(PropTypes.any),
    postedBy: PropTypes.string,
    createdAt: PropTypes.string
  }),
  index: PropTypes.number.isRequired
};

Link.defaultProps = {
  link: { description: '', url: '', votes: [], postedBy: '', createdAt: '' }
};

export default Link;
