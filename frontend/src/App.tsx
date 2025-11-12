import React from 'react';

/**
 * Main Application Component
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🦷 Hippocrates Dental
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            SaaS-платформа для стоматологических клиник
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✅</span>
                <span className="text-lg">Frontend настроен</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✅</span>
                <span className="text-lg">React + TypeScript + Vite</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✅</span>
                <span className="text-lg">Tailwind CSS работает</span>
              </div>
            </div>
            
            <div className="mt-8 text-gray-500">
              <p className="font-mono text-sm">npm run dev</p>
              <p className="text-xs mt-2">http://localhost:5173</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

