import React, { useState } from 'react';
import { Button, Card, Modal, Input, Spinner } from '../../components/common';
import { useUsers, useCreateUser, useDeleteUser } from '../../hooks/useUsers';

/**
 * Staff Page
 * Управление сотрудниками
 */
export const StaffPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('');

  const { data, isLoading, error } = useUsers({ role: roleFilter || undefined });
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor' as 'admin' | 'doctor' | 'assistant',
    specialization: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'doctor',
        specialization: '',
        phone: '',
      });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Удалить сотрудника ${name}?`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err: any) {
        alert(err.message || 'Ошибка удаления');
      }
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

  const users = data?.users || [];

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      doctor: 'bg-blue-100 text-blue-800',
      assistant: 'bg-green-100 text-green-800',
    };
    const labels = {
      admin: 'Администратор',
      doctor: 'Врач',
      assistant: 'Ассистент',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Сотрудники</h1>
          <p className="text-gray-600 mt-1">Всего: {data?.meta.total || 0}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>➕ Добавить сотрудника</Button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Фильтр по роли</label>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Все</option>
          <option value="admin">Администраторы</option>
          <option value="doctor">Врачи</option>
          <option value="assistant">Ассистенты</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <Card key={user.id}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                {getRoleBadge(user.role)}
              </div>

              {user.specialization && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Специализация:</span> {user.specialization}
                </p>
              )}

              {user.phone && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Телефон:</span> {user.phone}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(user.id, user.name)}
                  className="w-full"
                >
                  Удалить
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить сотрудника"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ФИО"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
            helperText="Минимум 8 символов, 1 заглавная, 1 цифра"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Роль <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value as any })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="doctor">Врач</option>
              <option value="assistant">Ассистент</option>
              <option value="admin">Администратор</option>
            </select>
          </div>

          {formData.role === 'doctor' && (
            <Input
              label="Специализация"
              placeholder="Терапевт, Хирург, Ортодонт..."
              value={formData.specialization}
              onChange={e => setFormData({ ...formData, specialization: e.target.value })}
            />
          )}

          <Input
            label="Телефон"
            type="tel"
            placeholder="+374 98 123456"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Создать
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


