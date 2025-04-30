export interface Job {
  id: number;
  clientName: string;
  address: string;
  systemSize: number;
  preferredInstallDate: string;
  createdAt: string;
  companyId: number;
}

export interface CreateJobRequest {
  clientName: string;
  address: string;
  systemSize: number;
  preferredInstallDate: string;
}

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
}