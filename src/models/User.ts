// User and authentication related types

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  subscription?: UserSubscription;
}

export interface UserSubscription {
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
  expiresAt?: string;
  features: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'superadmin';
  permissions: string[];
  lastLogin?: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}