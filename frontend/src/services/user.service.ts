import api from './api';
import { ApiResponse, User, PaginatedResponse } from '../types/api.types';

/**
 * User Service
 * API calls для работы с пользователями/сотрудниками
 */

export const userService = {
  /**
   * Получить всех пользователей
   */
  async getAll(params?: { role?: string; page?: number; limit?: number }): Promise<PaginatedResponse<User>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<User>>>('/api/v1/users', {
      params,
    });
    return data.data;
  },

  /**
   * Получить только врачей
   */
  async getDoctors(): Promise<User[]> {
    const { data } = await api.get<ApiResponse<User[]>>('/api/v1/users/doctors');
    return data.data;
  },

  /**
   * Получить пользователя по ID
   */
  async getById(id: string): Promise<User> {
    const { data } = await api.get<ApiResponse<User>>(`/api/v1/users/${id}`);
    return data.data;
  },

  /**
   * Создать пользователя
   */
  async create(user: {
    name: string;
    email: string;
    password: string;
    role: string;
    specialization?: string;
    phone?: string;
  }): Promise<User> {
    const { data } = await api.post<ApiResponse<User>>('/api/v1/users', user);
    return data.data;
  },

  /**
   * Обновить пользователя
   */
  async update(id: string, user: Partial<User>): Promise<User> {
    const { data } = await api.put<ApiResponse<User>>(`/api/v1/users/${id}`, user);
    return data.data;
  },

  /**
   * Удалить пользователя
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/api/v1/users/${id}`);
  },
};


