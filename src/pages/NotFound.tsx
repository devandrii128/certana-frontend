import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;