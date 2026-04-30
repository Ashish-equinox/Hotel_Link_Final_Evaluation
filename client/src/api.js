const API = "https://hotel-link-final-evaluation.onrender.com";

export const apiFetch = (path, options = {}) => {
  return fetch(`${API}${path}`, {
    credentials: "include",
    ...options,
  });
};