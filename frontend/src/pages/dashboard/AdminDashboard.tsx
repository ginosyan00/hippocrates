import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card, Button } from '../../components/common';
import { useAuthStore } from '../../store/useAuthStore';
import { userService } from '../../services/user.service';
import { User } from '../../types/api.types';

/**
 * AdminDashboard
 * Dashboard для администраторов с управлением pending users
 */
export const AdminDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Загрузка pending users
  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      setIsLoading(true);
      const users = await userService.getPendingUsers();
      setPendingUsers(users);
    } catch (err: any) {
      console.error('Ошибка загрузки pending users:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await userService.approveUser(userId);
      // Обновляем список
      await loadPendingUsers();
      alert('Пользователь успешно одобрен!');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Вы уверены что хотите отклонить этого пользователя?')) {
      return;
    }

    try {
      await userService.rejectUser(userId);
      // Обновляем список
      await loadPendingUsers();
      alert('Пользователь отклонен');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const getRoleTitle = (role: string) => {
    if (role === 'DOCTOR') return '⚕️ Врач';
    if (role === 'PARTNER') return '🏢 Партнер';
    return role;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-50 mb-2">
            Панель администратора 🔑
          </h1>
          <p className="text-sm text-text-10">
            Добро пожаловать, {user?.name}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">-</h3>
              <p className="text-xs text-text-10">Всего пользователей</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⏳</div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-1">{pendingUsers.length}</h3>
              <p className="text-xs text-text-10">На одобрении</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⚕️</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">
                {pendingUsers.filter(u => u.role === 'DOCTOR').length}
              </h3>
              <p className="text-xs text-text-10">Врачей на одобрении</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">
                {pendingUsers.filter(u => u.role === 'PARTNER').length}
              </h3>
              <p className="text-xs text-text-10">Партнеров на одобрении</p>
            </div>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-50">Заявки на одобрение</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full">
              {pendingUsers.length} новых
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-text-10">
              <div className="text-4xl mb-2">⏳</div>
              <p className="text-sm">Загрузка...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-sm">{error}</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-8 text-text-10">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-sm">Нет заявок на одобрение</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingUsers.map(pendingUser => (
                <Card key={pendingUser.id} className="border border-stroke" padding="md">
                  <div className="flex items-start justify-between gap-4">
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getRoleTitle(pendingUser.role).split(' ')[0]}</span>
                        <h3 className="font-semibold text-text-50">{pendingUser.name}</h3>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-[10px] font-medium rounded">
                          {getRoleTitle(pendingUser.role)}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-text-10">
                        <p>📧 {pendingUser.email}</p>
                        {pendingUser.phone && <p>📱 {pendingUser.phone}</p>}

                        {/* Doctor Info */}
                        {pendingUser.role === 'DOCTOR' && (
                          <>
                            <p>🩺 {pendingUser.specialization}</p>
                            <p>📋 Лицензия: {pendingUser.licenseNumber}</p>
                            <p>⏱️ Опыт: {pendingUser.experience} лет</p>
                          </>
                        )}

                        {/* Partner Info */}
                        {pendingUser.role === 'PARTNER' && (
                          <>
                            <p>🏢 {pendingUser.organizationName}</p>
                            <p>📋 ИНН: {pendingUser.inn}</p>
                            <p>📍 {pendingUser.address}</p>
                          </>
                        )}

                        <p className="text-[10px] text-text-05 pt-1">
                          Зарегистрирован: {new Date(pendingUser.createdAt).toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApprove(pendingUser.id)}
                        className="text-xs"
                      >
                        ✅ Одобрить
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleReject(pendingUser.id)}
                        className="text-xs hover:bg-red-50 hover:text-red-600"
                      >
                        ❌ Отклонить
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Пользователи</h3>
              <p className="text-xs text-text-10">Управление всеми пользователями системы</p>
            </button>
          </Card>

          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">⚕️</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Врачи</h3>
              <p className="text-xs text-text-10">Одобрение и управление врачами</p>
            </button>
          </Card>

          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Партнеры</h3>
              <p className="text-xs text-text-10">Одобрение и управление партнерами</p>
            </button>
          </Card>

          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Аналитика</h3>
              <p className="text-xs text-text-10">Статистика и отчеты системы</p>
            </button>
          </Card>

          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Настройки</h3>
              <p className="text-xs text-text-10">Конфигурация системы</p>
            </button>
          </Card>

          <Card padding="lg">
            <button className="w-full text-left">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-text-50 text-base mb-2">Уведомления</h3>
              <p className="text-xs text-text-10">Email и системные уведомления</p>
            </button>
          </Card>
        </div>

        {/* System Info */}
        <Card className="bg-blue-50 border-blue-200" padding="md">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Система:</strong> Все сервисы работают нормально
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

