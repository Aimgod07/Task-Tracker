import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token') || document.cookie.includes('token');
    
    if (!token) {
      setUser(null);
      navigate('/login');
      return false;
    }
    setUser({ token });
    return true;
  };

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, logout, checkAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);