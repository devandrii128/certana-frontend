import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../types/auth.types';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      // Error is handled in the auth context
      console.error('Login failed:', err);
    }
  };
  
  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Certana
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Solar jobs platform for companies and electricians
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <div>
              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Test Accounts</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-xs font-medium text-gray-700">Solar Company</p>
                <p className="text-xs text-gray-500">
                  Username: <span className="font-mono">admin</span>
                </p>
                <p className="text-xs text-gray-500">
                  Password: <span className="font-mono">admin123</span>
                </p>
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-xs font-medium text-gray-700">Electrician</p>
                <p className="text-xs text-gray-500">
                  Username: <span className="font-mono">electrician</span>
                </p>
                <p className="text-xs text-gray-500">
                  Password: <span className="font-mono">elect123</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;