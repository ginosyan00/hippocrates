import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common';

/**
 * Home Page
 * Главная страница Hippocrates
 */
export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">🦷 Hippocrates</h1>
          <div className="flex gap-4">
            <Link to="/clinics">
              <Button variant="secondary">Каталог клиник</Button>
            </Link>
            <Link to="/login">
              <Button>Вход для клиник</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ваша улыбка —<br />наша забота
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Современная платформа для записи к стоматологу онлайн.
            <br />
            Найдите клинику рядом и запишитесь на приём за 2 минуты.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/clinics">
              <Button size="lg">🏥 Найти клинику</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                💼 Для клиник
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Найдите клинику</h3>
            <p className="text-gray-600">
              Выбирайте из каталога стоматологических клиник в вашем городе
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Запишитесь онлайн</h3>
            <p className="text-gray-600">
              Выберите удобное время и запишитесь на приём за пару кликов
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Получите подтверждение</h3>
            <p className="text-gray-600">
              Клиника свяжется с вами для подтверждения приёма
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы к здоровой улыбке?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Запишитесь на приём прямо сейчас
          </p>
          <Link to="/clinics">
            <Button size="lg" variant="secondary">
              Выбрать клинику
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Hippocrates Dental. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            SaaS-платформа для стоматологических клиник
          </p>
        </div>
      </footer>
    </div>
  );
};


