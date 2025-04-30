import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { AuthState, LoginCredentials, User } from '../types/auth.types';
import * as authService from '../services/authService';

// Define action types
enum ActionType {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  RESTORE_AUTH = 'RESTORE_AUTH',
}

// Define actions
type Action =
  | { type: ActionType.LOGIN_REQUEST }
  | { type: ActionType.LOGIN_SUCCESS; payload: { user: User; token: string } }
  | { type: ActionType.LOGIN_FAILURE; payload: string }
  | { type: ActionType.LOGOUT }
  | { type: ActionType.RESTORE_AUTH; payload: { user: User; token: string } };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create context
export const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
});

// Reducer function
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case ActionType.RESTORE_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore authentication state from localStorage on mount
  useEffect(() => {
    const token = authService.getStoredToken();
    const user = authService.getStoredUser();

    if (token && user) {
      dispatch({
        type: ActionType.RESTORE_AUTH,
        payload: { user, token },
      });
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: ActionType.LOGIN_REQUEST });

    try {
      const response = await authService.login(credentials);
      
      // Store auth data in localStorage
      authService.storeAuthData(response.token, response.user);

      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: {
          user: response.user,
          token: response.token,
        },
      });
    } catch (error) {
      const errorMessage = 
        error instanceof Error ? error.message : 'An unknown error occurred';
      
      dispatch({
        type: ActionType.LOGIN_FAILURE,
        payload: errorMessage,
      });
      
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    authService.removeAuthData();
    dispatch({ type: ActionType.LOGOUT });
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};