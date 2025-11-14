import React from 'react';
import { NewDashboardLayout } from '../../components/dashboard/NewDashboardLayout';
import { Card, Button } from '../../components/common';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * PatientDashboard
 * Գեղեցիկ dashboard պացիենտների համար
 */
export const PatientDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);

  // Mock upcoming appointments
  const upcomingAppointments = [
    { id: 1, doctor: 'Др. Арам Григорян', specialization: 'Стоматолог', date: '15 Янв 2025', time: '10:00', clinic: 'Медцентр Здоровье' },
    { id: 2, doctor: 'Др. Мария Саркисян', specialization: 'Терапевт', date: '18 Янв 2025', time: '14:30', clinic: 'Клиника Плюс' },
  ];

  // Mock recent visits
  const recentVisits = [
    { id: 1, doctor: 'Др. Анна Петросян', date: '10 Дек 2024', diagnosis: 'Профосмотр' },
    { id: 2, doctor: 'Др. Давид Аветисян', date: '25 Ноя 2024', diagnosis: 'Консультация' },
  ];

  return (
    <NewDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-main-100 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                Здравствуйте, {user?.name}! 👋
              </h1>
              <p className="text-white/80 text-sm">
                Рады видеть вас снова. У вас {upcomingAppointments.length} предстоящих записи.
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-20">
              👤
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="lg" className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-text-10 mb-2">Предстоящие</p>
                <h3 className="text-3xl font-bold text-main-100">{upcomingAppointments.length}</h3>
                <p className="text-xs text-text-10 mt-1">записи</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-text-10 mb-2">Всего визитов</p>
                <h3 className="text-3xl font-bold text-green-600">{recentVisits.length}</h3>
                <p className="text-xs text-text-10 mt-1">посещений</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-text-10 mb-2">Рецепты</p>
                <h3 className="text-3xl font-bold text-purple-600">3</h3>
                <p className="text-xs text-text-10 mt-1">активных</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💊</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-text-10 mb-2">Сообщения</p>
                <h3 className="text-3xl font-bold text-orange-600">2</h3>
                <p className="text-xs text-text-10 mt-1">новых</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-50">Предстоящие записи</h2>
                <Button variant="primary" size="sm">➕ Записаться</Button>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 text-text-10">
                  <div className="text-4xl mb-2">📅</div>
                  <p className="text-sm">Нет предстоящих записей</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map(appointment => (
                    <Card key={appointment.id} className="border border-stroke hover:border-main-100 transition-colors" padding="md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-main-100 bg-opacity-10 rounded-lg flex items-center justify-center">
                            <span className="text-xl">⚕️</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-text-50 text-sm">{appointment.doctor}</h3>
                            <p className="text-xs text-text-10">{appointment.specialization}</p>
                            <p className="text-xs text-text-10 mt-1">
                              📍 {appointment.clinic}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-text-50">{appointment.date}</p>
                          <p className="text-xs text-text-10">{appointment.time}</p>
                          <Button variant="primary" size="sm" className="mt-2">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Visits */}
            <Card padding="lg" className="mt-6">
              <h2 className="text-lg font-semibold text-text-50 mb-4">Недавние визиты</h2>
              <div className="space-y-3">
                {recentVisits.map(visit => (
                  <div key={visit.id} className="flex items-center justify-between p-3 border border-stroke rounded-lg hover:bg-bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">✅</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-text-50 text-sm">{visit.doctor}</h3>
                        <p className="text-xs text-text-10">{visit.diagnosis}</p>
                      </div>
                    </div>
                    <p className="text-xs text-text-10">{visit.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card padding="lg">
              <h2 className="text-lg font-semibold text-text-50 mb-4">Быстрые действия</h2>
              <div className="space-y-2">
                <button className="w-full p-3 border-2 border-main-100 bg-main-100 bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <h3 className="font-medium text-main-100 text-sm">Записаться на прием</h3>
                      <p className="text-xs text-text-10">Выбрать врача и время</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Мед. карта</h3>
                      <p className="text-xs text-text-10">История лечения</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💊</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Рецепты</h3>
                      <p className="text-xs text-text-10">Активные назначения</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 border border-stroke rounded-lg hover:border-main-100 hover:bg-main-100 hover:bg-opacity-5 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <h3 className="font-medium text-text-50 text-sm">Консультация</h3>
                      <p className="text-xs text-text-10">Задать вопрос</p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* Health Tips */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200" padding="lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-text-50 text-sm mb-2">Совет дня</h3>
                  <p className="text-xs text-text-10 leading-relaxed">
                    Пейте не менее 8 стаканов воды в день для поддержания здоровья!
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="bg-main-100 bg-opacity-5 border-main-100" padding="md">
              <div className="text-center">
                <span className="text-2xl">📞</span>
                <h3 className="font-semibold text-text-50 text-sm mt-2 mb-1">Нужна помощь?</h3>
                <p className="text-xs text-text-10 mb-3">
                  Свяжитесь с нами
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Позвонить
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
};
