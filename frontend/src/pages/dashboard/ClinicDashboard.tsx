import React, { useState, useEffect } from 'react';
import { NewDashboardLayout } from '../../components/dashboard/NewDashboardLayout';
import { Card, Button } from '../../components/common';
import { AddDoctorModal } from '../../components/dashboard/AddDoctorModal';
import { useAuthStore } from '../../store/useAuthStore';
import { userService } from '../../services/user.service';
import { User } from '../../types/api.types';

/**
 * ClinicDashboard
 * Գեղեցիկ dashboard կլինիկայի համար
 */
export const ClinicDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);
  
  // State для врачей
  const [doctors, setDoctors] = useState<User[]>([]);
  const [isDoctorsLoading, setIsDoctorsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Загрузка врачей
  useEffect(() => {
    loadDoctors();
  }, []);
  
  const loadDoctors = async () => {
    try {
      setIsDoctorsLoading(true);
      const data = await userService.getDoctors();
      setDoctors(data);
    } catch (err: any) {
      console.error('Ошибка загрузки врачей:', err.message);
    } finally {
      setIsDoctorsLoading(false);
    }
  };
  
  const handleDoctorCreated = () => {
    loadDoctors();
  };

  // Mock data
  const todayStats = {
    appointments: 12,
    patients: 45,
    revenue: '45,000 ֏',
  };

  return (
    <NewDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                Панель управления клиникой 🏥
              </h1>
              <p className="text-white/80 text-sm">
                {user?.name} • {doctors.length} врачей в команде
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-20">
              🏥
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="lg" className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-blue-700 mb-2 font-medium">Врачей</p>
                <h3 className="text-4xl font-bold text-blue-600">{doctors.length}</h3>
                <p className="text-xs text-blue-600 mt-2">в клинике</p>
              </div>
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">⚕️</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-green-700 mb-2 font-medium">Записей сегодня</p>
                <h3 className="text-4xl font-bold text-green-600">{todayStats.appointments}</h3>
                <p className="text-xs text-green-600 mt-2">пациентов</p>
              </div>
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">📅</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-purple-700 mb-2 font-medium">Всего пациентов</p>
                <h3 className="text-4xl font-bold text-purple-600">{todayStats.patients}</h3>
                <p className="text-xs text-purple-600 mt-2">зарегистрировано</p>
              </div>
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-orange-700 mb-2 font-medium">Доход сегодня</p>
                <h3 className="text-3xl font-bold text-orange-600">{todayStats.revenue}</h3>
                <p className="text-xs text-orange-600 mt-2">текущий день</p>
              </div>
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Врачи клиники */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-text-50">Команда врачей</h2>
                  <p className="text-xs text-text-10 mt-1">Управление специалистами клиники</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  ➕ Добавить врача
                </Button>
              </div>
              
              {isDoctorsLoading ? (
                <div className="text-center py-12 text-text-10">
                  <div className="text-5xl mb-3 animate-pulse">⏳</div>
                  <p className="text-sm">Загрузка...</p>
                </div>
              ) : doctors.length === 0 ? (
                <div className="text-center py-12 text-text-10">
                  <div className="text-5xl mb-3">👨‍⚕️</div>
                  <p className="text-sm mb-4">Добавьте первого врача в вашу клинику</p>
                  <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    ➕ Добавить врача
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map(doctor => (
                    <Card key={doctor.id} className="border-2 border-stroke hover:border-main-100 hover:shadow-md transition-all" padding="md">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-main-100 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-2xl">⚕️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text-50 truncate">{doctor.name}</h3>
                          <p className="text-xs text-main-100 font-medium truncate">{doctor.specialization}</p>
                          <p className="text-xs text-text-10 mt-2 truncate">📧 {doctor.email}</p>
                          {doctor.phone && (
                            <p className="text-xs text-text-10 truncate">📱 {doctor.phone}</p>
                          )}
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-medium rounded">
                              {doctor.experience} лет
                            </span>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                              {doctor.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card padding="lg">
              <h2 className="text-lg font-semibold text-text-50 mb-4">Быстрые действия</h2>
              <div className="space-y-2">
                <button className="w-full p-3 border-2 border-main-100 bg-main-100 bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">➕</span>
                    <div>
                      <h3 className="font-medium text-main-100 text-sm">Новая запись</h3>
                      <p className="text-xs text-text-10">Записать пациента</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👥</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Пациенты</h3>
                      <p className="text-xs text-text-10">База пациентов</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Статистика</h3>
                      <p className="text-xs text-text-10">Отчеты и аналитика</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Настройки</h3>
                      <p className="text-xs text-text-10">Настройки клиники</p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* Today's Schedule */}
            <Card padding="lg" className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <h2 className="text-lg font-semibold text-text-50 mb-3">График на сегодня</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-10">09:00 - 12:00</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">4 записи</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-10">14:00 - 18:00</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">8 записей</span>
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200" padding="md">
              <div className="text-center">
                <span className="text-3xl">✨</span>
                <h3 className="font-semibold text-text-50 text-sm mt-2 mb-1">Отличная работа!</h3>
                <p className="text-xs text-text-10">
                  Ваша клиника обслужила {todayStats.patients} пациентов в этом месяце
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleDoctorCreated}
      />
    </NewDashboardLayout>
  );
};
