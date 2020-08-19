import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMainDefinition } from '@apollo/client/utilities';
import App from './App';
import { AUTH_TOKEN } from './utils/Constants';
import AuthProvider from './context/AuthContext';

const URI =
  process.env.NODE_ENV === 'production'
    ? 'gentle-lowlands-39679.herokuapp.com'
    : 'localhost:4000';

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

const subscriptionLink = new WebSocketLink({
  uri: `ws://${URI}`,
  options: {
    reconnect: true,
    connectionParams: { authToken: localStorage.getItem(AUTH_TOKEN) }
  }
});

const httpLink = createHttpLink({ uri: `http://${URL}` });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  subscriptionLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
