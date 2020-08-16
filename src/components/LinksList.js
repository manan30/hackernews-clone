import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

const linksToRender = [
  {
    id: '1',
    description: 'Prisma turns your database into a GraphQL API 😎',
    url: 'https://www.prismagraphql.com'
  },
  {
    id: '2',
    description: 'The best GraphQL client',
    url: 'https://www.apollographql.com/docs/react/'
  }
];

function LinksList() {
  return (
    <div>
      {linksToRender.map((link) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link link={link} />
      ))}
    </div>
  );
}

LinksList.propTypes = {};

export default LinksList;
