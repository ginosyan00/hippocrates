import React, { useState } from 'react';
import { Button, Card, Spinner } from '../../components/common';
import { useAppointments, useUpdateAppointmentStatus } from '../../hooks/useAppointments';
import { AppointmentStatus } from '../../types/api.types';

/**
 * Appointments Page
 * Управление приёмами
 */
export const AppointmentsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const { data, isLoading, error } = useAppointments({
    status: statusFilter || undefined,
    date: dateFilter || undefined,
  });
  const updateStatusMutation = useUpdateAppointmentStatus();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Ошибка изменения статуса');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Ошибка загрузки: {(error as any).message}
        </div>
      </div>
    );
  }

  const appointments = data?.appointments || [];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      pending: 'Ожидает',
      confirmed: 'Подтвержден',
      completed: 'Завершен',
      cancelled: 'Отменен',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Приёмы</h1>
          <p className="text-gray-600 mt-1">Всего: {data?.meta.total || 0}</p>
        </div>
        <Button>➕ Создать приём</Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Все</option>
            <option value="pending">Ожидает подтверждения</option>
            <option value="confirmed">Подтвержден</option>
            <option value="completed">Завершен</option>
            <option value="cancelled">Отменен</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-500">
            Приёмы не найдены
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map(appointment => (
            <Card key={appointment.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.patient?.name}
                    </h3>
                    {getStatusBadge(appointment.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Врач:</p>
                      <p>{appointment.doctor?.name}</p>
                      <p className="text-xs text-gray-500">{appointment.doctor?.specialization}</p>
                    </div>
                    <div>
                      <p className="font-medium">Дата и время:</p>
                      <p>
                        {new Date(appointment.appointmentDate).toLocaleString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-xs text-gray-500">Длительность: {appointment.duration} мин</p>
                    </div>
                  </div>

                  {appointment.reason && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">Причина визита:</p>
                      <p className="text-gray-600">{appointment.reason}</p>
                    </div>
                  )}

                  {appointment.notes && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">Заметки:</p>
                      <p className="text-gray-600">{appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  {appointment.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                    >
                      Подтвердить
                    </Button>
                  )}
                  {appointment.status === 'confirmed' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                    >
                      Завершить
                    </Button>
                  )}
                  {['pending', 'confirmed'].includes(appointment.status) && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                    >
                      Отменить
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};


