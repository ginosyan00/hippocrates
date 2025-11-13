import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Input, Modal, Spinner } from '../../components/common';
import { useClinic, useClinicDoctors, useCreatePublicAppointment } from '../../hooks/usePublic';

/**
 * Clinic Page
 * Страница клиники (лендинг + форма онлайн-записи)
 */
export const ClinicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { data: clinic, isLoading: clinicLoading } = useClinic(slug!);
  const { data: doctors, isLoading: doctorsLoading } = useClinicDoctors(slug!);
  const createMutation = useCreatePublicAppointment();

  // Form state
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const handleOpenModal = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setIsModalOpen(true);
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}:00Z`;

      await createMutation.mutateAsync({
        clinicSlug: slug!,
        doctorId: selectedDoctor,
        patient: {
          name: formData.patientName,
          phone: formData.patientPhone,
          email: formData.patientEmail || undefined,
        },
        appointmentDate: appointmentDateTime,
        reason: formData.reason || undefined,
      });

      setSuccessMessage('✅ Ваша заявка принята! Клиника свяжется с вами в ближайшее время.');
      setFormData({
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
      });
    } catch (err: any) {
      alert(err.message || 'Ошибка создания заявки');
    }
  };

  if (clinicLoading || doctorsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <h2 className="text-xl font-bold text-red-600">Клиника не найдена</h2>
          <Link to="/clinics">
            <Button className="mt-4">← Вернуться к каталогу</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const workingHours = clinic.workingHours || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary-600">🦷 Hippocrates</h1>
          </Link>
          <Link to="/clinics">
            <Button variant="secondary">← Все клиники</Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        {/* Clinic Info */}
        <Card className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{clinic.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Контакты</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {clinic.city}, {clinic.address}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {clinic.phone}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {clinic.email}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">График работы</h3>
              <div className="space-y-1 text-sm text-gray-700">
                {Object.entries(workingHours).length > 0 ? (
                  Object.entries(workingHours).map(([day, schedule]: [string, any]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize font-medium">{getDayName(day)}:</span>
                      <span>
                        {schedule.isOpen ? `${schedule.open} - ${schedule.close}` : 'Выходной'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">График не указан</p>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          {clinic.about && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">О клинике</h3>
              <p className="text-gray-700">{clinic.about}</p>
            </div>
          )}
        </Card>

        {/* Doctors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Наши врачи</h2>
          {!doctors || doctors.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500">Список врачей пока пуст</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map(doctor => (
                <Card key={doctor.id}>
                  <div className="text-center space-y-3">
                    <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-primary-600">{doctor.specialization}</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleOpenModal(doctor.id)}
                    >
                      📅 Записаться
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSuccessMessage('');
        }}
        title="Онлайн-запись на приём"
        size="lg"
      >
        {successMessage ? (
          <div className="text-center py-8">
            <div className="bg-green-100 text-green-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-primary-50 border border-primary-200 text-primary-800 px-4 py-3 rounded">
              <p className="text-sm">
                Врач: <strong>{doctors?.find(d => d.id === selectedDoctor)?.name}</strong>
              </p>
            </div>

            <Input
              label="Ваше ФИО"
              placeholder="Иван Иванов"
              value={formData.patientName}
              onChange={e => setFormData({ ...formData, patientName: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Телефон"
                type="tel"
                placeholder="+374 98 123456"
                value={formData.patientPhone}
                onChange={e => setFormData({ ...formData, patientPhone: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="example@mail.com"
                value={formData.patientEmail}
                onChange={e => setFormData({ ...formData, patientEmail: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Дата"
                type="date"
                value={formData.appointmentDate}
                onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Input
                label="Время"
                type="time"
                value={formData.appointmentTime}
                onChange={e => setFormData({ ...formData, appointmentTime: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Причина визита
              </label>
              <textarea
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Опишите вашу проблему..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Отмена
              </Button>
              <Button type="submit" isLoading={createMutation.isPending}>
                Отправить заявку
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

// Helper для перевода дней недели
function getDayName(day: string): string {
  const names: Record<string, string> = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
  };
  return names[day] || day;
}


