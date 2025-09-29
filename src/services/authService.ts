// Authentication API service
import BaseApiService from "./baseApiService";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  AdminLoginRequest,
  AdminUser,
} from "@/models";
import { API_ENDPOINTS } from "@/config/apiConfig";

class AuthService extends BaseApiService {
  /**
   * User login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }

    return response.data!;
  }

  /**
   * User registration
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }

    return response.data!;
  }

  /**
   * User logout
   */
  async logout(): Promise<void> {
    await this.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.clearAuthToken();
  }

  /**
   * Admin login
   */
  async adminLogin(
    credentials: AdminLoginRequest
  ): Promise<{ admin: AdminUser; token: string }> {
    const response = await this.post<{ admin: AdminUser; token: string }>(
      API_ENDPOINTS.ADMIN.LOGIN,
      credentials
    );

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }

    return response.data!;
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ token: string }> {
    const response = await this.post<{ token: string }>(
      API_ENDPOINTS.AUTH.REFRESH
    );

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }

    return response.data!;
  }

  /**
   * Set authentication token in localStorage and default headers
   */
  private setAuthToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  /**
   * Clear authentication token
   */
  private clearAuthToken(): void {
    localStorage.removeItem("authToken");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Check if token is expired (basic JWT check)
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  /**
   * Get authorization headers for API requests
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Export a singleton instance
export const authService = new AuthService();
export default authService;
