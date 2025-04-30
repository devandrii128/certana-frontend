import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types/job.types';
import { UserRole } from '../../types/auth.types';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { user } = useAuth();
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>{job.clientName}</CardTitle>
        <span className="rounded-full bg-secondary-100 px-2.5 py-0.5 text-sm font-medium text-secondary-800">
          {job.systemSize} kW
        </span>
      </CardHeader>

      <CardContent>
        <div className="mt-2 space-y-2">
          <div className="flex items-start">
            <svg
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600">{job.address}</span>
          </div>

          <div className="flex items-start">
            <svg
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Install date: <span className="font-medium">{formatDate(job.preferredInstallDate)}</span>
            </span>
          </div>

          <div className="flex items-start">
            <svg
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Posted: <span className="font-medium">{formatDate(job.createdAt)}</span>
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        
        {user?.role === UserRole.ELECTRICIAN && (
          <Button size="sm">Place Bid</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;