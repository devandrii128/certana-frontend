import { useState, useEffect, useCallback } from 'react';
import { Job, CreateJobRequest } from '../types/job.types';
import * as jobService from '../services/jobService';

/**
 * Custom hook for managing jobs
 */
const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all jobs
   */
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await jobService.getAllJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch job by ID
   */
  const fetchJobById = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await jobService.getJobById(id);
      setSelectedJob(data);
      return data;
    } catch (err) {
      setError('Failed to fetch job details. Please try again.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new job
   */
  const createJob = useCallback(async (jobData: CreateJobRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const newJob = await jobService.createJob(jobData);
      setJobs((prevJobs) => [...prevJobs, newJob]);
      return newJob;
    } catch (err) {
      setError('Failed to create job. Please try again.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load jobs on initial render
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    selectedJob,
    isLoading,
    error,
    fetchJobs,
    fetchJobById,
    createJob,
  };
};

export default useJobs;