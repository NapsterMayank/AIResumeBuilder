// API configuration utility
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : window.location.origin);

// Debug logging
console.log("API Configuration:");
console.log("MODE:", import.meta.env.MODE);
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
console.log("window.location.origin:", typeof window !== 'undefined' ? window.location.origin : 'undefined');
console.log("Final API_BASE_URL:", API_BASE_URL);

export const API_ENDPOINTS = {
  REGENERATE: `${API_BASE_URL}/api/regenerate`,
};

export { API_BASE_URL };
