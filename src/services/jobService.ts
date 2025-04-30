import api from './api';
import { Job, CreateJobRequest } from '../types/job.types';

/**
 * Get all jobs
 */
export const getAllJobs = async (): Promise<Job[]> => {
  const response = await api.get<Job[]>('/jobs');
  return response.data;
};

/**
 * Get job by ID
 */
export const getJobById = async (id: number): Promise<Job> => {
  const response = await api.get<Job>(`/jobs/${id}`);
  return response.data;
};

/**
 * Create a new job
 */
export const createJob = async (jobData: CreateJobRequest): Promise<Job> => {
  const response = await api.post<Job>('/jobs', jobData);
  return response.data;
};