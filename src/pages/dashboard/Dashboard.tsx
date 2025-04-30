import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useJobs from '../../hooks/useJobs';
import Button from '../../components/common/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';

const Dashboard: React.FC = () => {
  const { user, isCompany } = useAuth();
  const { jobs, isLoading } = useJobs();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Certana</h1>
        <p className="mt-2 text-lg text-gray-600">
          The platform connecting solar companies with certified electricians
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{user?.username}</h3>
                <p className="text-sm text-gray-500">
                  {isCompany() ? 'Solar Company' : 'Electrician'}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900">Account Type</h4>
              <p className="mt-1 text-sm text-gray-500">
                {isCompany()
                  ? 'As a solar company, you can post installation jobs and manage bids from electricians.'
                  : 'As an electrician, you can browse available jobs and place bids on projects.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="text-2xl font-bold text-primary-600">
                  {isLoading ? '...' : jobs.length}
                </div>
                <div className="text-sm text-gray-500">Available Jobs</div>
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="text-2xl font-bold text-secondary-500">0</div>
                <div className="text-sm text-gray-500">
                  {isCompany() ? 'Active Bids' : 'Your Bids'}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900">Quick Links</h4>
              <div className="mt-2 flex flex-col space-y-2">
                <Link
                  to="/jobs"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Browse all jobs
                </Link>
                {isCompany() && (
                  <Link
                    to="/jobs/create"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Post a new job
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Get Started</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {isCompany() ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Post Your First Job</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Create a new solar installation job listing to attract qualified electricians.
                  </p>
                  <div className="mt-6">
                    <Link to="/jobs/create">
                      <Button>Post a Job</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Manage Your Jobs</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View all your active job listings and the bids you've received from electricians.
                  </p>
                  <div className="mt-6">
                    <Link to="/jobs">
                      <Button variant="outline">View Jobs</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Find Solar Jobs</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Browse through available solar installation jobs that match your skills.
                  </p>
                  <div className="mt-6">
                    <Link to="/jobs">
                      <Button>Browse Jobs</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Place Bids</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Submit competitive bids for solar installation jobs that interest you.
                  </p>
                  <div className="mt-6">
                    <Link to="/jobs">
                      <Button variant="outline">View Available Jobs</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;