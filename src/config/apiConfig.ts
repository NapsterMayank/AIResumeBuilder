// Centralized API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : window.location.origin);

export const API_ENDPOINTS = {
  REGENERATE: `${API_BASE_URL}/api/regenerate`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  },
  ADMIN: {
    LOGIN: `${API_BASE_URL}/api/admin/login`,
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  },
  RESUME: {
    SAVE: `${API_BASE_URL}/api/resume/save`,
    LOAD: `${API_BASE_URL}/api/resume/load`,
    DELETE: `${API_BASE_URL}/api/resume/delete`,
  },
} as const;

export { API_BASE_URL };

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;