import React, { useState } from 'react';
import Button from './Button';
import { LeadData } from '../types';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LeadData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    jobTitle: 'MD/CEO',
    turnover: '£5-20M',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.companyName) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-ignite-navy">Before we start...</h2>
          <p className="text-gray-600 mt-2">
            Tell us a little about your organisation so we can personalise your report and benchmark data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Work Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <select
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy bg-white"
              >
                <option>MD/CEO</option>
                <option>Operations Director</option>
                <option>Finance Director</option>
                <option>IT Director</option>
                <option>Other Senior Leader</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="turnover" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Turnover
              </label>
              <select
                id="turnover"
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ignite-navy focus:border-ignite-navy bg-white"
              >
                <option>Under £5M</option>
                <option>£5-20M</option>
                <option>£20-50M</option>
                <option>£50-100M</option>
                <option>Over £100M</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth>
              Start Assessment
            </Button>
            <p className="text-xs text-gray-400 text-center mt-4">
              Your data is secure. We will email you your detailed report.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;