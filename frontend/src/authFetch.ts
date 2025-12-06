const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

console.log('API_URL:', API_URL);

export async function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
}