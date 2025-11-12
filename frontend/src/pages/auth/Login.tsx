import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';

// Import logo
import brainLogo from '../../assets/icons/brain-logo.svg';

/**
 * Login Page - Figma Design
 * Страница авторизации в новом стиле
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={brainLogo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-semibold text-main-100">Medic</h1>
          </div>
          <p className="text-text-10 text-sm">Войдите в панель управления</p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="admin@clinic.am"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Пароль"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <Card className="bg-red-50 border-red-200" padding="sm">
                <p className="text-red-600 text-xs">{error}</p>
              </Card>
            )}

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} size="lg">
              Войти
            </Button>

            <div className="text-center text-xs text-text-10">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-main-100 hover:underline font-medium">
                Зарегистрировать клинику
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-stroke">
              <p className="text-[10px] text-text-10 text-center">
                Тестовые данные:
                <br />
                admin@dentalux.am / Admin123!
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
