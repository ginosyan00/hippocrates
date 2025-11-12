import React from 'react';
import { useUIStore } from '../../store/useUIStore';

/**
 * Header Component
 * Верхняя панель Dashboard
 */
export const Header: React.FC = () => {
  const toggleSidebar = useUIStore(state => state.toggleSidebar);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-gray-100 transition-smooth group"
        >
          <svg className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-6">
          {/* Date Display */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
            <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Notifications Badge */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-smooth group">
            <svg className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>
    </header>
  );
};


