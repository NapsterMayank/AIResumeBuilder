// API configuration utility
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : "https://ai-resume-builder-three-gold.vercel.app");

export const API_ENDPOINTS = {
  REGENERATE: `${API_BASE_URL}/api/regenerate`,
};

export { API_BASE_URL };
