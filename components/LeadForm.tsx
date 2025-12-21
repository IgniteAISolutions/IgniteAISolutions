
import React, { useState } from 'react';
import Button from './Button';
import { LeadData } from '../types';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<LeadData, 'utm'>>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    jobTitle: 'MD/CEO',
    turnover: '£5-20M',
    gdprConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.companyName && formData.gdprConsent) {
      onSubmit(formData as LeadData);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-ignite-orange focus:ring-1 focus:ring-ignite-orange outline-none transition-all placeholder:text-gray-600";
  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="glass-panel rounded-2xl p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Personalise Your Results</h2>
          <p className="text-gray-400 mt-3">
            Benchmarked against similar sized UK organisations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className={labelClasses}>First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Chris"
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Duffy"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>Work Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="chris@company.com"
            />
          </div>

          <div>
            <label htmlFor="companyName" className={labelClasses}>Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Acme Ltd"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobTitle" className={labelClasses}>Job Title</label>
              <select
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="MD/CEO">MD/CEO</option>
                <option value="Operations Director">Operations Director</option>
                <option value="Finance Director">Finance Director</option>
                <option value="IT Director">IT Director</option>
                <option value="Other Senior Leader">Other Senior Leader</option>
              </select>
            </div>
            <div>
              <label htmlFor="turnover" className={labelClasses}>Annual Turnover</label>
              <select
                id="turnover"
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="Under £5M">Under £5M</option>
                <option value="£5-20M">£5-20M</option>
                <option value="£20-50M">£20-50M</option>
                <option value="£50-100M">£50-100M</option>
                <option value="Over £100M">Over £100M</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <div className="flex items-start">
              <input
                id="gdprConsent"
                name="gdprConsent"
                type="checkbox"
                required
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-ignite-orange focus:ring-ignite-orange"
              />
              <label htmlFor="gdprConsent" className="ml-3 text-xs text-gray-400 leading-relaxed">
                I agree to receive my AI Readiness Report and occasional AI insights via email. I can unsubscribe at any time. <a href="#" className="text-ignite-orange hover:underline">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <Button type="submit" fullWidth>
            Start Assessment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
