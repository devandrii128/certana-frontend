import api from './api';
import { LoginCredentials, LoginResponse, User } from '../types/auth.types';

/**
 * Login user with credentials
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data.user;
};

/**
 * Store auth data in localStorage
 */
export const storeAuthData = (token: string, user: User): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Remove auth data from localStorage
 */
export const removeAuthData = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Get stored token
 */
export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Get stored user
 */
export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};