import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * Register Page
 * Страница регистрации клиники
 */
export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  // Clinic data
  const [clinicName, setClinicName] = useState('');
  const [clinicSlug, setClinicSlug] = useState('');
  const [clinicEmail, setClinicEmail] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  const [clinicCity, setClinicCity] = useState('Yerevan');
  const [clinicAddress, setClinicAddress] = useState('');

  // Admin data
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate slug from clinic name
  const handleClinicNameChange = (value: string) => {
    setClinicName(value);
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setClinicSlug(slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.register({
        clinic: {
          name: clinicName,
          slug: clinicSlug,
          email: clinicEmail,
          phone: clinicPhone,
          city: clinicCity,
          address: clinicAddress || undefined,
        },
        admin: {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
        },
      });

      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🦷 Hippocrates</h1>
          <p className="text-gray-600">Регистрация стоматологической клиники</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Clinic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Данные клиники</h3>
              <div className="space-y-4">
                <Input
                  label="Название клиники"
                  placeholder="Дента Люкс"
                  value={clinicName}
                  onChange={e => handleClinicNameChange(e.target.value)}
                  required
                />

                <Input
                  label="Slug (URL)"
                  placeholder="denta-lux"
                  value={clinicSlug}
                  onChange={e => setClinicSlug(e.target.value)}
                  required
                  helperText="Будет использоваться в URL: hippocrates.am/clinic/slug"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email клиники"
                    type="email"
                    placeholder="info@clinic.am"
                    value={clinicEmail}
                    onChange={e => setClinicEmail(e.target.value)}
                    required
                  />

                  <Input
                    label="Телефон"
                    placeholder="+374 98 123456"
                    value={clinicPhone}
                    onChange={e => setClinicPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Город"
                    placeholder="Yerevan"
                    value={clinicCity}
                    onChange={e => setClinicCity(e.target.value)}
                    required
                  />

                  <Input
                    label="Адрес"
                    placeholder="ул. Абовяна 10"
                    value={clinicAddress}
                    onChange={e => setClinicAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Данные администратора</h3>
              <div className="space-y-4">
                <Input
                  label="ФИО администратора"
                  placeholder="Арам Григорян"
                  value={adminName}
                  onChange={e => setAdminName(e.target.value)}
                  required
                />

                <Input
                  label="Email администратора"
                  type="email"
                  placeholder="admin@clinic.am"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  required
                  helperText="Используется для входа в систему"
                />

                <Input
                  label="Пароль"
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  required
                  helperText="Минимум 8 символов, 1 заглавная буква, 1 цифра"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Зарегистрировать клинику
            </Button>

            <div className="text-center text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Войти
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};


