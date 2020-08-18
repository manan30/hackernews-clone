import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  ApolloLink
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AUTH_TOKEN } from './utils/Constants';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  return forward(operation);
});

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
