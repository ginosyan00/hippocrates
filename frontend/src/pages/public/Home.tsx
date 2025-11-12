import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common';

/**
 * Home Page
 * Главная страница Hippocrates
 */
export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🦷</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Hippocrates
            </h1>
          </div>
          <div className="flex gap-3">
            <Link to="/clinics">
              <Button variant="secondary" className="hover:scale-105 transition-smooth">Каталог клиник</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-smooth">
                Вход для клиник
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary-700">Современная платформа для записи онлайн</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight animate-slide-up">
            Ваша улыбка —<br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
              наша забота
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Найдите лучшую стоматологическую клинику в вашем городе и запишитесь на приём за 2 минуты
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
            <Link to="/clinics">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:scale-105 transition-smooth text-lg px-8 py-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Найти клинику
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                size="lg" 
                variant="secondary" 
                className="hover:scale-105 transition-smooth text-lg px-8 py-6 border-2 border-gray-200 hover:border-primary-300 bg-white hover:bg-primary-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Для клиник
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-scale-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">1000+</div>
              <div className="text-sm text-gray-600 mt-1">Пациентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-600 mt-1">Клиник</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Как это работает</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Простой и быстрый способ записаться к стоматологу онлайн
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-smooth border border-gray-100 hover:border-primary-200 animate-scale-in">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-smooth">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-2">01</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Найдите клинику</h3>
            <p className="text-gray-600 leading-relaxed">
              Выбирайте из каталога проверенных стоматологических клиник в вашем городе
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-smooth border border-gray-100 hover:border-accent-200 animate-scale-in" style={{animationDelay: '0.1s'}}>
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-500/30 group-hover:scale-110 transition-smooth">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-accent-600 mb-2">02</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Запишитесь онлайн</h3>
            <p className="text-gray-600 leading-relaxed">
              Выберите удобное время и запишитесь на приём за пару кликов без звонков
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-smooth border border-gray-100 hover:border-blue-200 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-smooth">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">03</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Получите подтверждение</h3>
            <p className="text-gray-600 leading-relaxed">
              Клиника свяжется с вами для подтверждения приёма и уточнения деталей
            </p>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
              Готовы к здоровой улыбке?
            </h2>
            <p className="text-xl mb-10 text-primary-100 animate-slide-up">
              Присоединяйтесь к тысячам довольных пациентов. Запишитесь на приём прямо сейчас!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in">
              <Link to="/clinics">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-700 hover:bg-gray-50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-smooth text-lg px-8 py-6 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Начать сейчас
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm hover:scale-105 transition-smooth text-lg px-8 py-6 font-semibold"
                >
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <div className="text-xl font-bold">Hippocrates</div>
                <div className="text-sm text-gray-400">Dental Platform</div>
              </div>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-smooth">О нас</a>
              <a href="#" className="hover:text-white transition-smooth">Контакты</a>
              <a href="#" className="hover:text-white transition-smooth">Поддержка</a>
              <a href="#" className="hover:text-white transition-smooth">Политика</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Hippocrates Dental. Все права защищены.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Современная SaaS-платформа для стоматологических клиник
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};


