import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import JobsList from './pages/jobs/JobList';
import JobCreate from './pages/jobs/JobCreate';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="jobs">
            <Route index element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
            <Route path="create" element={<ProtectedRoute><JobCreate /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;