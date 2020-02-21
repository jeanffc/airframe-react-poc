export const TOKEN_KEY = "@token";
export const AUTHOR_KEY = "@author";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getAuthor = () => localStorage.getItem(AUTHOR_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const author = author_id => {
  localStorage.setItem(AUTHOR_KEY, author_id);
};
