import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserRole } from '../../types/auth.types';
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-primary-600">Certana</span>
                <span className="ml-2 text-xs text-gray-500">Solar Jobs Platform</span>
              </Link>
            </div>
            <div className="ml-6 hidden sm:flex sm:space-x-8">
              {/* Replace Link with NavLink and use className as a function */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
                end  // Important for exact matching of the root path
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
                end  // Only match exact /jobs path
              >
                Jobs
              </NavLink>
              {user?.role === UserRole.COMPANY && (
                <NavLink
                  to="/jobs/create"
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-gray-900"
                      : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }
                >
                  Post Job
                </NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <div className="mr-4 flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-900">{user?.username}</span>
                      <span className="text-xs text-gray-500">
                        {user?.role === UserRole.COMPANY ? 'Solar Company' : 'Electrician'}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;