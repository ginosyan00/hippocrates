import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { RegisterUserPage } from './pages/auth/RegisterUser';
import { PendingApprovalPage } from './pages/auth/PendingApproval';
import { DashboardPage } from './pages/dashboard/Dashboard';
import { PatientsPage } from './pages/dashboard/Patients';
import { AppointmentsPage } from './pages/dashboard/Appointments';
import { StaffPage } from './pages/dashboard/Staff';
import { PharmacyPage } from './pages/dashboard/Pharmacy';
import { PatientDashboard } from './pages/dashboard/PatientDashboard';
import { DoctorDashboard } from './pages/dashboard/DoctorDashboard';
import { ClinicDashboard } from './pages/dashboard/ClinicDashboard';
import { PartnerDashboard } from './pages/dashboard/PartnerDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { HomePage } from './pages/public/Home';
import { ClinicsPage } from './pages/public/Clinics';
import { ClinicPage } from './pages/public/ClinicPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

/**
 * Main Application Component
 * Router + Routes setup with Multi-Role Support
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/clinics" element={<ClinicsPage />} />
        <Route path="/clinic/:slug" element={<ClinicPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />

        {/* Protected Routes - Role-based Dashboards */}
        <Route
          path="/dashboard/patient"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/clinic"
          element={
            <ProtectedRoute>
              <ClinicDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/doctor"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/partner"
          element={
            <ProtectedRoute>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Old Dashboard (для существующих клиник) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="pharmacy" element={<PharmacyPage />} />
          <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Аналитика (в разработке)</h1></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Настройки (в разработке)</h1></div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

