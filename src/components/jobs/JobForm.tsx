import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateJobRequest } from '../../types/job.types';
import useJobs from '../../hooks/useJobs';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const { createJob, isLoading, error } = useJobs();
  
  const [formData, setFormData] = useState<CreateJobRequest>({
    clientName: '',
    address: '',
    systemSize: 0,
    preferredInstallDate: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // Convert numeric inputs to numbers
    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.clientName.trim()) {
      errors.clientName = 'Client name is required';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.systemSize || formData.systemSize <= 0) {
      errors.systemSize = 'System size must be greater than 0';
    }
    
    if (!formData.preferredInstallDate) {
      errors.preferredInstallDate = 'Installation date is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await createJob(formData);
      navigate('/jobs');
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Solar Installation Job</CardTitle>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="flex items-center">
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
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Client Name"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
              error={formErrors.clientName}
              disabled={isLoading}
              required
            />
            
            <Input
              label="Installation Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter installation address"
              error={formErrors.address}
              disabled={isLoading}
              required
            />
            
            <Input
              label="System Size (kW)"
              id="systemSize"
              name="systemSize"
              type="number"
              min="0.1"
              step="0.1"
              value={formData.systemSize === 0 ? '' : formData.systemSize}
              onChange={handleChange}
              placeholder="Enter system size in kW"
              error={formErrors.systemSize}
              disabled={isLoading}
              required
            />
            
            <Input
              label="Preferred Installation Date"
              id="preferredInstallDate"
              name="preferredInstallDate"
              type="date"
              value={formData.preferredInstallDate}
              onChange={handleChange}
              error={formErrors.preferredInstallDate}
              disabled={isLoading}
              required
            />
          </div>
          
          <CardFooter className="mt-6 flex justify-end space-x-3 px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/jobs')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Create Job
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobForm;