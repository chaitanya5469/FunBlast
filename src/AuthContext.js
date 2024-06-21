import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/check-auth`, { withCredentials: true });
      setIsLoggedIn(response.data.authenticated);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
