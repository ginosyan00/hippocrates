import api from './api';
import { ApiResponse, Clinic, User, PaginatedResponse } from '../types/api.types';

/**
 * Public Service
 * API calls для публичных endpoints (без авторизации)
 */

export const publicService = {
  /**
   * Получить список клиник
   */
  async getClinics(params?: { city?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Clinic>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Clinic>>>(
      '/api/v1/public/clinics',
      { params }
    );
    return data.data;
  },

  /**
   * Получить клинику по slug
   */
  async getClinicBySlug(slug: string): Promise<Clinic> {
    const { data } = await api.get<ApiResponse<Clinic>>(`/api/v1/public/clinics/${slug}`);
    return data.data;
  },

  /**
   * Получить врачей клиники
   */
  async getClinicDoctors(slug: string): Promise<User[]> {
    const { data } = await api.get<ApiResponse<User[]>>(`/api/v1/public/clinics/${slug}/doctors`);
    return data.data;
  },

  /**
   * Получить список городов
   */
  async getCities(): Promise<string[]> {
    const { data } = await api.get<ApiResponse<string[]>>('/api/v1/public/cities');
    return data.data;
  },

  /**
   * Создать публичную заявку на приём
   */
  async createAppointment(appointmentData: {
    clinicSlug: string;
    doctorId: string;
    patient: {
      name: string;
      phone: string;
      email?: string;
    };
    appointmentDate: string;
    reason?: string;
  }): Promise<any> {
    const { data } = await api.post<ApiResponse<any>>(
      '/api/v1/public/appointments',
      appointmentData
    );
    return data.data;
  },
};


