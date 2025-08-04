import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:5050';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Checking auth, token:', token ? 'exists' : 'not found');
        if (!token) {
          setLoading(false);
          return;
        }
        
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('User data from /me:', res.data);
        setUser(res.data.data.user);
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log('Register response:', res.data);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.data.user);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.data.user);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  console.log('AuthContext user state:', user);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);