import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <MyContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthProvider;