import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/common';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * PatientDashboard
 * Dashboard для пациентов
 */
export const PatientDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-50 mb-2">
            Добро пожаловать, {user?.name}! 👤
          </h1>
          <p className="text-sm text-text-10">Панель пациента</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0</h3>
              <p className="text-xs text-text-10">Предстоящие приемы</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🏥</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0</h3>
              <p className="text-xs text-text-10">Всего визитов</p>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">💊</div>
              <h3 className="text-2xl font-bold text-main-100 mb-1">0</h3>
              <p className="text-xs text-text-10">Назначений</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold text-text-50 mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📅</div>
                <div>
                  <h3 className="font-medium text-text-50 text-sm mb-1">Записаться на прием</h3>
                  <p className="text-xs text-text-10">Выберите врача и время</p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📋</div>
                <div>
                  <h3 className="font-medium text-text-50 text-sm mb-1">Медицинская карта</h3>
                  <p className="text-xs text-text-10">История лечения</p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💬</div>
                <div>
                  <h3 className="font-medium text-text-50 text-sm mb-1">Консультация</h3>
                  <p className="text-xs text-text-10">Задать вопрос врачу</p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💊</div>
                <div>
                  <h3 className="font-medium text-text-50 text-sm mb-1">Аптеки</h3>
                  <p className="text-xs text-text-10">Найти лекарства</p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        {/* Info */}
        <Card className="bg-blue-50 border-blue-200" padding="md">
          <p className="text-sm text-blue-800">
            <strong>📱 Совет:</strong> Скачайте наше мобильное приложение для быстрого доступа к своей медицинской карте!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

