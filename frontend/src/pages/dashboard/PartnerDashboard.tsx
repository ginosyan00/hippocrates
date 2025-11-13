import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/common';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * PartnerDashboard
 * Dashboard для партнеров (аптеки, лаборатории, страховые)
 */
export const PartnerDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);

  const getOrganizationTypeTitle = () => {
    if (user?.organizationType === 'pharmacy') return '🏪 Аптека';
    if (user?.organizationType === 'laboratory') return '🔬 Лаборатория';
    if (user?.organizationType === 'insurance') return '🛡️ Страховая компания';
    return '🏢 Организация';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-50 mb-2">
            {user?.organizationName || 'Партнер'} {getOrganizationTypeTitle().split(' ')[0]}
          </h1>
          <p className="text-sm text-text-10">
            {getOrganizationTypeTitle()} • ИНН: {user?.inn || 'Не указано'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0</h3>
              <p className="text-xs text-text-10">Заказов сегодня</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0₽</h3>
              <p className="text-xs text-text-10">Выручка за месяц</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0</h3>
              <p className="text-xs text-text-10">Активных клиентов</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">5.0</h3>
              <p className="text-xs text-text-10">Рейтинг</p>
            </div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold text-text-50 mb-4">Последние заказы</h2>
            <div className="space-y-3">
              <div className="text-center py-8 text-text-10">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-sm">Нет новых заказов</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold text-text-50 mb-4">Быстрые действия</h2>
            <div className="space-y-3">
              <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="text-xl">📋</div>
                  <div>
                    <h3 className="font-medium text-text-50 text-sm">Каталог продуктов</h3>
                    <p className="text-xs text-text-10">Управление товарами</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="text-xl">📊</div>
                  <div>
                    <h3 className="font-medium text-text-50 text-sm">Отчеты</h3>
                    <p className="text-xs text-text-10">Статистика продаж</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="text-xl">⚙️</div>
                  <div>
                    <h3 className="font-medium text-text-50 text-sm">Настройки</h3>
                    <p className="text-xs text-text-10">Профиль организации</p>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Organization Info */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold text-text-50 mb-4">Информация об организации</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-10 mb-1">Название:</p>
              <p className="text-text-50 font-medium">{user?.organizationName || 'Не указано'}</p>
            </div>
            <div>
              <p className="text-text-10 mb-1">Тип:</p>
              <p className="text-text-50 font-medium">{getOrganizationTypeTitle()}</p>
            </div>
            <div>
              <p className="text-text-10 mb-1">ИНН:</p>
              <p className="text-text-50 font-medium">{user?.inn || 'Не указано'}</p>
            </div>
            <div>
              <p className="text-text-10 mb-1">Адрес:</p>
              <p className="text-text-50 font-medium">{user?.address || 'Не указано'}</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

