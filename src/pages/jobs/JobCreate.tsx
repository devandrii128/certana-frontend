import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../../types/auth.types';
import useAuth from '../../hooks/useAuth';
import JobForm from '../../components/jobs/JobForm';

const JobCreatePage: React.FC = () => {
  const { isAuthenticated, isCompany } = useAuth();

  // Redirect if not authenticated or not a company
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isCompany()) {
    return <Navigate to="/jobs" />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-gray-600">
          Create a new solar installation job for electricians to bid on
        </p>
      </div>
      
      <JobForm />
    </div>
  );
};

export default JobCreatePage;