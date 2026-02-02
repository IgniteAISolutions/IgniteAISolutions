import React, { useState } from 'react';
import { LeadData } from '../types';
import Button from './Button';
import { Lock } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  // Capture lead source from URL parameter or default to "AI Readiness Scorecard"
  const getLeadSource = (): LeadData['leadSource'] => {
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get('source');

    const validSources: Array<LeadData['leadSource']> = [
      'AI Readiness Scorecard',
      'Lead Magnet',
      'Survey',
      'Lead Response Crisis Form'
    ];

    return validSources.find(s => s === sourceParam) || 'AI Readiness Scorecard';
  };

  const [formData, setFormData] = useState<Partial<LeadData>>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    turnover: '',
    leadSource: getLeadSource(),
    gdprConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gdprConsent && formData.email) {
      onSubmit(formData as LeadData);
    }
  };

  const inputClasses = "w-full bg-black/40 border border-white/10 rounded-lg px-5 py-4 text-lg text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none";
  const labelClasses = "block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4">First, let's unlock your report.</h2>
        <p className="text-xl text-gray-400">We'll email you a copy of your full Human Capability Scorecard.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-10 md:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}>First Name</label>
            <input 
              required 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className={labelClasses}>Last Name</label>
            <input 
              required 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your Surname"
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Work Email</label>
          <input 
            required 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your Work Email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <label className={labelClasses}>Company Name</label>
            <input 
                required 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your Company Name"
            />
            </div>
             <div>
            <label className={labelClasses}>Job Title</label>
            <input 
                required 
                type="text" 
                name="jobTitle" 
                value={formData.jobTitle} 
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your Job Title"
            />
            </div>
        </div>

        <div>
          <label className={labelClasses}>Company Turnover (Approx)</label>
          <select 
            required 
            name="turnover" 
            value={formData.turnover} 
            onChange={handleChange}
            className={`${inputClasses} appearance-none`}
          >
            <option value="" disabled>Select turnover band...</option>
            <option value="<1M">Less than £1M</option>
            <option value="1M-10M">£1M – £10M</option>
            <option value="10M-50M">£10M – £50M</option>
            <option value="50M+">£50M+</option>
          </select>
        </div>

        <div className="pt-4">
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                required 
                type="checkbox" 
                name="gdprConsent" 
                checked={formData.gdprConsent} 
                onChange={handleChange}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded border border-white/20 bg-black/40 checked:bg-orange-500 checked:border-orange-500 transition-all"
              />
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              I agree to receive my report and occasional insights on AI strategy. I accept the <a href="https://igniteaisolutions.co.uk/privacy.html" target="_blank" rel="noreferrer" className="underline text-orange-500 hover:text-orange-400 font-bold z-10 relative" onClick={(e) => e.stopPropagation()}>Privacy Policy</a> and understand I can unsubscribe at any time.
            </span>
          </label>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          className="mt-6 text-xl py-5"
          disabled={!formData.gdprConsent}
        >
          Begin Assessment
        </Button>

        <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mt-4">
          <Lock className="w-3 h-3" />
          <span>Your data is secure and never shared.</span>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
