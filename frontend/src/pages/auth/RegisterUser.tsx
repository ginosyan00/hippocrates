import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../../components/common';
import { RoleSelector, UserRole } from '../../components/auth/RoleSelector';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';

// Import logo
import brainLogo from '../../assets/icons/brain-logo.svg';

/**
 * RegisterUser Page - Multi-Role Registration
 * Регистрация пользователя с выбором роли (Patient, Doctor, Partner)
 */
export const RegisterUserPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  // По умолчанию: PATIENT роль выбрана
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  // Doctor fields
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experience, setExperience] = useState('');

  // Partner fields
  const [organizationName, setOrganizationName] = useState('');
  const [organizationType, setOrganizationType] = useState<'pharmacy' | 'laboratory' | 'insurance'>('pharmacy');
  const [inn, setInn] = useState('');
  const [address, setAddress] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    console.log('🔵 [REGISTER] Переключение на роль:', role);
    setSelectedRole(role);
    setError('');
    
    // Сбрасываем role-specific поля при смене роли
    if (role !== 'DOCTOR') {
      setSpecialization('');
      setLicenseNumber('');
      setExperience('');
    }
    if (role !== 'PARTNER') {
      setOrganizationName('');
      setOrganizationType('pharmacy');
      setInn('');
      setAddress('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔵 [REGISTER] Отправка регистрации:', { role: selectedRole, email });

    try {
      // Подготовка данных в зависимости от роли
      const userData: any = {
        role: selectedRole,
        name,
        email,
        password,
        phone: phone || undefined,
        dateOfBirth: dateOfBirth || undefined,
        gender,
      };

      // Добавляем role-specific поля
      if (selectedRole === 'DOCTOR') {
        userData.specialization = specialization;
        userData.licenseNumber = licenseNumber;
        userData.experience = parseInt(experience);
      }

      if (selectedRole === 'PARTNER') {
        userData.organizationName = organizationName;
        userData.organizationType = organizationType;
        userData.inn = inn;
        userData.address = address;
      }

      const response = await authService.registerUser(userData);
      
      console.log('✅ [REGISTER] Регистрация успешна:', response.user);

      setAuth(response.user, response.token);

      // Redirect based on role and status
      if (response.user.status === 'PENDING') {
        // Для Doctor и Partner - показываем страницу ожидания
        navigate('/pending-approval');
      } else {
        // Для Patient - сразу на dashboard
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.log('🔴 [REGISTER] Ошибка:', err.message);
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={brainLogo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-semibold text-main-100">Medic</h1>
          </div>
          <p className="text-text-10 text-sm">Создайте аккаунт</p>
        </div>

        <Card padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT SIDEBAR: Role Tabs */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-text-50 mb-3">Тип аккаунта</h3>
              <div className="space-y-2">
                {/* PATIENT Tab */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('PATIENT')}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all
                    ${
                      selectedRole === 'PATIENT'
                        ? 'border-main-100 bg-main-100 bg-opacity-5 shadow-sm'
                        : 'border-stroke hover:border-main-100 hover:border-opacity-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👤</span>
                    <div>
                      <div className="font-medium text-text-50 text-sm">Пациент</div>
                      <div className="text-[10px] text-text-10">Обычный пользователь</div>
                    </div>
                  </div>
                  {selectedRole === 'PATIENT' && (
                    <div className="mt-2 pt-2 border-t border-stroke">
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-medium rounded">
                        ✓ По умолчанию
                      </span>
                    </div>
                  )}
                </button>

                {/* DOCTOR Tab */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('DOCTOR')}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all
                    ${
                      selectedRole === 'DOCTOR'
                        ? 'border-main-100 bg-main-100 bg-opacity-5 shadow-sm'
                        : 'border-stroke hover:border-main-100 hover:border-opacity-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚕️</span>
                    <div>
                      <div className="font-medium text-text-50 text-sm">Врач</div>
                      <div className="text-[10px] text-text-10">Специалист</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-stroke">
                    <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-medium rounded">
                      ⏳ Требует одобрения
                    </span>
                  </div>
                </button>

                {/* PARTNER Tab */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('PARTNER')}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all
                    ${
                      selectedRole === 'PARTNER'
                        ? 'border-main-100 bg-main-100 bg-opacity-5 shadow-sm'
                        : 'border-stroke hover:border-main-100 hover:border-opacity-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏢</span>
                    <div>
                      <div className="font-medium text-text-50 text-sm">Партнер</div>
                      <div className="text-[10px] text-text-10">Аптеки, лаборатории</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-stroke">
                    <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-medium rounded">
                      ⏳ Требует одобрения
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Registration Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">

              {/* Common Fields */}
              <div>
                <h3 className="text-base font-medium text-text-50 mb-4">Основная информация</h3>
                <div className="space-y-4">
                  <Input
                    label="ФИО"
                    placeholder="Арам Григорян"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="user@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />

                    <Input
                      label="Телефон"
                      placeholder="+374 98 123456"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>

                  <Input
                    label="Пароль"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    helperText="Минимум 8 символов, 1 заглавная, 1 цифра"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Дата рождения"
                      type="date"
                      value={dateOfBirth}
                      onChange={e => setDateOfBirth(e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-text-50 mb-2">Пол</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value as any)}
                        className="w-full px-4 py-3 border border-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-main-100 text-sm"
                      >
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor-specific Fields */}
              {selectedRole === 'DOCTOR' && (
                <div>
                  <h3 className="text-base font-medium text-text-50 mb-4">Профессиональная информация</h3>
                  <div className="space-y-4">
                    <Input
                      label="Специализация"
                      placeholder="Стоматолог-терапевт"
                      value={specialization}
                      onChange={e => setSpecialization(e.target.value)}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Номер лицензии"
                        placeholder="MD-123456"
                        value={licenseNumber}
                        onChange={e => setLicenseNumber(e.target.value)}
                        required
                      />

                      <Input
                        label="Опыт работы (лет)"
                        type="number"
                        placeholder="5"
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                        required
                      />
                    </div>

                    <Card className="bg-yellow-50 border-yellow-200" padding="sm">
                      <p className="text-yellow-700 text-xs">
                        ⏳ Ваш аккаунт будет активирован после проверки администратором
                      </p>
                    </Card>
                  </div>
                </div>
              )}

              {/* Partner-specific Fields */}
              {selectedRole === 'PARTNER' && (
                <div>
                  <h3 className="text-base font-medium text-text-50 mb-4">Информация об организации</h3>
                  <div className="space-y-4">
                    <Input
                      label="Название организации"
                      placeholder="Аптека №1"
                      value={organizationName}
                      onChange={e => setOrganizationName(e.target.value)}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-50 mb-2">Тип организации</label>
                        <select
                          value={organizationType}
                          onChange={e => setOrganizationType(e.target.value as any)}
                          className="w-full px-4 py-3 border border-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-main-100 text-sm"
                        >
                          <option value="pharmacy">Аптека</option>
                          <option value="laboratory">Лаборатория</option>
                          <option value="insurance">Страховая компания</option>
                        </select>
                      </div>

                      <Input label="ИНН/ОГРН" placeholder="1234567890" value={inn} onChange={e => setInn(e.target.value)} required />
                    </div>

                    <Input
                      label="Адрес"
                      placeholder="ул. Абовяна 10, Ереван"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      required
                    />

                    <Card className="bg-yellow-50 border-yellow-200" padding="sm">
                      <p className="text-yellow-700 text-xs">
                        ⏳ Ваш аккаунт будет активирован после проверки администратором
                      </p>
                    </Card>
                  </div>
                </div>
              )}

              {error && (
                <Card className="bg-red-50 border-red-200" padding="sm">
                  <p className="text-red-600 text-xs">{error}</p>
                </Card>
              )}

                <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} size="lg">
                  Зарегистрироваться
                </Button>

                <div className="text-center text-xs text-text-10">
                  Уже есть аккаунт?{' '}
                  <Link to="/login" className="text-main-100 hover:underline font-medium">
                    Войти
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

