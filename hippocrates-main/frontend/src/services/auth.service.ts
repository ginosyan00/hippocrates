import api from './api';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../types/api.types';

/**
 * Auth Service
 * API calls для аутентификации
 */

export const authService = {
  /**
   * Авторизация
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', credentials);
    return data.data;
  },

  /**
   * Регистрация клиники
   */
  async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    const { data } = await api.post<ApiResponse<RegisterResponse>>(
      '/api/v1/auth/register',
      registerData
    );
    return data.data;
  },

  /**
   * Получить текущего пользователя
   */
  async getMe(): Promise<User> {
    const { data } = await api.get<ApiResponse<User>>('/api/v1/auth/me');
    return data.data;
  },
};


