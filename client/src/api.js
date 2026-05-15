const API = import.meta.env.VITE_API_URL;

export const apiFetch = (path, options = {}) => {
  return fetch(`${API}${path}`, {
    credentials: "include",
    ...options,
  });
};