// 🎨 TEST FILE - Тестовый файл для проверки цветов Figma
// Откройте этот компонент, чтобы увидеть цвета дизайна

import React from 'react';

export const TestColors: React.FC = () => {
  return (
    <div className="p-8 bg-bg-primary min-h-screen">
      <h1 className="text-3xl font-semibold text-text-100 mb-8">
        🎨 Проверка цветов Figma
      </h1>

      {/* Main Colors */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-text-50 mb-4">Основные цвета</h2>
        <div className="flex gap-4">
          <div className="bg-main-100 text-white px-6 py-4 rounded-sm">
            Main/100: #3A6FF8
          </div>
          <div className="bg-main-10 text-main-100 px-6 py-4 rounded-sm">
            Main/10: #F5F6FF
          </div>
          <div className="bg-secondary-100 text-white px-6 py-4 rounded-sm">
            Secondary/100: #14CC26
          </div>
          <div className="bg-secondary-10 text-secondary-100 px-6 py-4 rounded-sm">
            Secondary/10: #FFF9F6
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-text-50 mb-4">Текстовые цвета</h2>
        <div className="flex gap-4">
          <div className="bg-bg-white border border-stroke px-6 py-4 rounded-lg">
            <p className="text-text-100 mb-2">Text/100: #1C1C1C</p>
            <p className="text-text-50 mb-2">Text/50: #676767</p>
            <p className="text-text-10">Text/10: #A9A9A9</p>
          </div>
        </div>
      </div>

      {/* Test Components */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-text-50 mb-4">Тестовые компоненты</h2>
        
        {/* Button */}
        <button className="bg-main-10 text-main-100 px-4 py-2 rounded-sm text-xs font-normal hover:bg-main-100 hover:text-white transition-smooth mb-4">
          Кнопка из Figma
        </button>

        {/* Card */}
        <div className="bg-bg-white border border-stroke rounded-lg p-5 max-w-md">
          <h3 className="text-lg font-medium text-text-50 mb-3">Карточка из Figma</h3>
          <p className="text-sm text-text-10 mb-4">
            Это тестовая карточка с дизайном из Figma.
            Проверьте цвета и стили.
          </p>
          <div className="flex gap-2">
            <span className="bg-main-10 text-main-100 px-3 py-1 rounded-sm text-xs">
              Badge 1
            </span>
            <span className="bg-secondary-10 text-secondary-100 px-3 py-1 rounded-sm text-xs">
              Badge 2
            </span>
          </div>
        </div>
      </div>

      {/* Status Check */}
      <div className="bg-bg-white border border-stroke rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-medium text-main-100 mb-4">
          ✅ Дизайн Figma применен!
        </h3>
        <ul className="space-y-2 text-sm text-text-50">
          <li>✓ Цвета: #3A6FF8 (синий)</li>
          <li>✓ Шрифт: Poppins</li>
          <li>✓ Border-radius: 8px, 15px</li>
          <li>✓ Stroke: #F1F1F1</li>
        </ul>
      </div>
    </div>
  );
};





