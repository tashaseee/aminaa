import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object, e.g., { id, name, email, role }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on component mount
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          // Parse stored user data
          const parsedUser = JSON.parse(storedUser);
          
          // Validate session with backend (adjust endpoint as needed)
          try {
            const response = await fetch('/api/user', {
              method: 'GET',
              credentials: 'include',
            });

            if (response.ok) {
              const data = await response.json();
              // Ensure role is included; default to 'user' if not provided
              const validatedUser = {
                ...data.user,
                role: data.user.role || 'user',
              };
              setUser(validatedUser);
              setIsAuthenticated(true);
              localStorage.setItem('user', JSON.stringify(validatedUser));
            } else {
              // Session expired or invalid
              localStorage.removeItem('user');
              setIsAuthenticated(false);
              setUser(null);
            }
          } catch (error) {
            console.error('Auth validation error:', error);
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('user');
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    const login = (userData) => {
      const validatedUser = {
        ...userData,
        role: userData.role || 'user',
      };
      localStorage.setItem('user', JSON.stringify(validatedUser));
      setUser(validatedUser);
      setIsAuthenticated(true);
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    // Ensure role is included; default to 'user' if not provided
    const validatedUser = {
      ...userData,
      role: userData.role || 'user',
    };
    localStorage.setItem('user', JSON.stringify(validatedUser));
    setUser(validatedUser);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Call logout endpoint (adjust as needed)
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);