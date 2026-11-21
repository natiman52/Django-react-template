import apiClient from './client';
import { setToken, setStoredUser, clearAuth } from '../utils/token';

/**
 * Log in a user with username (or email) and password.
 * Saves the received auth token and user profile to localStorage.
 *
 * @param {Object} credentials - { username, password }
 * @returns {Promise<{token: string, user: Object}>}
 */
export async function login({ username, password }) {
  const data = await apiClient.post('/api/auth/login/', { username, password });
  if (data?.token) {
    setToken(data.token);
  }
  if (data?.user) {
    setStoredUser(data.user);
  }
  return data;
}

/**
 * Register a new user and automatically log them in by storing the returned token.
 *
 * @param {Object} userData - { username, email, password, password_confirm, status, first_name, last_name }
 * @returns {Promise<{token: string, user: Object, message: string}>}
 */
export async function register(userData) {
  const data = await apiClient.post('/api/auth/register/', userData);
  if (data?.token) {
    setToken(data.token);
  }
  if (data?.user) {
    setStoredUser(data.user);
  }
  return data;
}

/**
 * Log out the current user by revoking the token on the backend and clearing storage.
 *
 * @returns {Promise<{detail: string}>}
 */
export async function logout() {
  try {
    const data = await apiClient.post('/api/auth/logout/');
    return data;
  } finally {
    clearAuth();
  }
}

/**
 * Fetch the currently authenticated user's profile from the backend.
 * Updates the user stored in localStorage.
 *
 * @returns {Promise<Object>} The user profile object
 */
export async function getCurrentUser() {
  const user = await apiClient.get('/api/auth/me/');
  if (user) {
    setStoredUser(user);
  }
  return user;
}

/**
 * Update the currently authenticated user's profile information.
 *
 * @param {Object} updateData - partial user fields to update (e.g. first_name, last_name, email)
 * @returns {Promise<Object>} The updated user profile object
 */
export async function updateProfile(updateData) {
  const user = await apiClient.patch('/api/auth/me/', updateData);
  if (user) {
    setStoredUser(user);
  }
  return user;
}
