import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';
import App from './App';

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
