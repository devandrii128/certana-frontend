import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { UserRole } from '../types/auth.types';

/**
 * Custom hook for using authentication context
 */
const useAuth = () => {
  const { state, login, logout } = useContext(AuthContext);

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: UserRole): boolean => {
    return state.user?.role === role;
  };

  /**
   * Check if user is a company
   */
  const isCompany = (): boolean => {
    return hasRole(UserRole.COMPANY);
  };

  /**
   * Check if user is an electrician
   */
  const isElectrician = (): boolean => {
    return hasRole(UserRole.ELECTRICIAN);
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    hasRole,
    isCompany,
    isElectrician,
  };
};

export default useAuth;