import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: response.data.user,
              token,
            },
          });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: response.data,
        });
        return { success: true, data: response.data };
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'AUTH_FAILURE',
        payload: message,
      });
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.register(userData);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: response.data,
        });
        return { success: true, data: response.data };
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'AUTH_FAILURE',
        payload: message,
      });
      return { success: false, message };
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const response = await authAPI.verifyEmail(email, otp);
      
      if (response.success) {
        dispatch({
          type: 'UPDATE_USER',
          payload: { isEmailVerified: true },
        });
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      return { success: false, message };
    }
  };

  const resendVerification = async (email) => {
    try {
      const response = await authAPI.resendVerification(email);
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend verification';
      return { success: false, message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      return { success: false, message };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await authAPI.resetPassword(email, otp, newPassword);
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
