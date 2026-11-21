const TOKEN_KEY = 'clothstock_auth_token';
const USER_KEY = 'clothstock_auth_user';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  } catch (e) {
    console.error('Failed to save token to localStorage', e);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token from localStorage', e);
  }
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to save user to localStorage', e);
  }
};

export const removeStoredUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to remove user from localStorage', e);
  }
};

export const clearAuth = () => {
  removeToken();
  removeStoredUser();
};
