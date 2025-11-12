import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Spinner } from '../../components/common';
import { useClinics, useCities } from '../../hooks/usePublic';

/**
 * Clinics Page
 * Каталог клиник
 */
export const ClinicsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const { data: citiesData } = useCities();
  const { data, isLoading, error } = useClinics({ city: selectedCity || undefined });

  const cities = citiesData || [];
  const clinics = data?.clinics || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary-600">🦷 Hippocrates</h1>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Вход для клиник</Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Стоматологические клиники</h1>
          <p className="text-gray-600">Найдите клинику рядом с вами и запишитесь онлайн</p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Город</label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Все города</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Ошибка загрузки клиник
          </div>
        )}

        {/* Clinics Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Клиники не найдены
              </div>
            ) : (
              clinics.map(clinic => (
                <Card key={clinic.id}>
                  <div className="space-y-3">
                    {/* Clinic Name */}
                    <h3 className="text-xl font-bold text-gray-900">{clinic.name}</h3>

                    {/* Info */}
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {clinic.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {clinic.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {clinic.email}
                      </div>
                    </div>

                    {/* About */}
                    {clinic.about && (
                      <p className="text-sm text-gray-700 line-clamp-2">{clinic.about}</p>
                    )}

                    {/* Action */}
                    <Link to={`/clinic/${clinic.slug}`}>
                      <Button className="w-full" variant="primary">
                        📅 Записаться на приём
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};


