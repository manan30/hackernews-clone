import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/Constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login() {
  const history = useHistory();

  const saveTokenData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
    history.push('/');
  };

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (d) => {
      saveTokenData(d.login.token);
    },
    onError: (e) => {
      console.log(e);
    }
  });
  const [details, setDetails] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: { email: details.email, password: details.password }
    });
  };

  const handleChange = (e, type) => {
    e.persist();
    setDetails((prevState) => ({ ...prevState, [type]: e.target.value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          id="email"
          value={details.email}
          onChange={(e) => handleChange(e, 'email')}
          type="text"
          placeholder="Your email address"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          value={details.password}
          onChange={(e) => handleChange(e, 'password')}
          type="password"
          placeholder="Choose a safe password"
        />
      </label>
      <div>
        <button type="submit">Login</button>
        <button type="button">Signup</button>
      </div>
    </form>
  );
}

export default Login;
