import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AUTH_TOKEN } from '../utils/Constants';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(AUTH_TOKEN) || ''
  );

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};
