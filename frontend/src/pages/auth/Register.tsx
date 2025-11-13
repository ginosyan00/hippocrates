import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';

// Import logo
import brainLogo from '../../assets/icons/brain-logo.svg';

/**
 * Register Page - Figma Design
 * Страница регистрации клиники в новом стиле
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
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={brainLogo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-semibold text-main-100">Medic</h1>
          </div>
          <p className="text-text-10 text-sm">Регистрация стоматологической клиники</p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Clinic Info */}
            <div>
              <h3 className="text-base font-medium text-text-50 mb-4">Данные клиники</h3>
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
              <h3 className="text-base font-medium text-text-50 mb-4">Данные администратора</h3>
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
              <Card className="bg-red-50 border-red-200" padding="sm">
                <p className="text-red-600 text-xs">{error}</p>
              </Card>
            )}

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} size="lg">
              Зарегистрировать клинику
            </Button>

            <div className="text-center text-xs text-text-10">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-main-100 hover:underline font-medium">
                Войти
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
