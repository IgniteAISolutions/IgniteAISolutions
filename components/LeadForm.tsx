import React, { useState } from 'react';
import { LeadData } from '../types';
import { SITE } from '../utils/constants';
import Button from './Button';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  onSkip: () => void;
  submitting: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onSkip, submitting }) => {
  // Lead source can be set by a ?source= parameter; default is the scorecard.
  const getLeadSource = (): LeadData['leadSource'] => {
    const sourceParam = new URLSearchParams(window.location.search).get('source');
    const validSources: Array<LeadData['leadSource']> = [
      'AI Readiness Scorecard', 'Lead Magnet', 'Survey', 'Lead Response Crisis Form',
    ];
    return validSources.find((s) => s === sourceParam) || 'AI Readiness Scorecard';
  };

  const [formData, setFormData] = useState<LeadData>({
    firstName: '', lastName: '', email: '', companyName: '', jobTitle: '',
    leadSource: getLeadSource(), gdprConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gdprConsent && formData.email) onSubmit(formData);
  };

  const input = 'w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all';
  const label = 'block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2';

  return (
    <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 py-10 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-3">Your result is ready.</h2>
        <p className="text-lg text-gray-300">
          Leave your details and Chris will send his read of your score and what he would do first.
          Or go straight to your result.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={label} htmlFor="firstName">First name</label>
            <input id="firstName" required type="text" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="lastName">Last name</label>
            <input id="lastName" required type="text" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className={input} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="email">Work email</label>
          <input id="email" required type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className={input} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={label} htmlFor="companyName">Company</label>
            <input id="companyName" required type="text" name="companyName" autoComplete="organization" value={formData.companyName} onChange={handleChange} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="jobTitle">Job title</label>
            <input id="jobTitle" type="text" name="jobTitle" autoComplete="organization-title" value={formData.jobTitle} onChange={handleChange} className={input} />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            required type="checkbox" name="gdprConsent" checked={formData.gdprConsent} onChange={handleChange}
            className="mt-1 h-5 w-5 flex-none accent-orange-500 cursor-pointer"
          />
          <span className="text-gray-300 text-sm leading-relaxed">
            I agree to Ignite AI Solutions contacting me about my result. See our{' '}
            <a href={`${SITE}/privacy`} target="_blank" rel="noreferrer" className="underline hover:text-orange-400">Privacy Policy</a>.
          </span>
        </label>

        <Button type="submit" fullWidth className="text-lg py-4" disabled={!formData.gdprConsent || submitting}>
          {submitting ? 'Sending…' : 'Send my details and show my result'}
        </Button>

        <button type="button" onClick={onSkip} className="block w-full text-center text-sm font-semibold text-gray-300 underline hover:text-white py-2">
          Skip this and show my result
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
