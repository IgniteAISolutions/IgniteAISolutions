import React, { useState } from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Target, Menu, X } from 'lucide-react';

// --- BUTTON COMPONENT (Inline for portability) ---
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button 
    className={`bg-gradient-to-br from-[#FF5200] to-[#DC2626] text-white font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E5E7EB] font-sans selection:bg-[#FF5200] selection:text-white relative overflow-hidden flex flex-col">
      
      {/* --- ATMOSPHERIC GLOWS --- */}
      <div className="fixed -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,82,0,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      <div className="fixed -bottom-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      {/* --- HEADER / NAVIGATION --- */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-md glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/ignite-logo-full.svg"
                  alt="Ignite AI Solutions Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-8 text-[13px] font-medium uppercase tracking-wide">
              <a href="https://www.igniteaisolutions.co.uk/" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="https://www.igniteaisolutions.co.uk/why-ai-fails.html" className="text-gray-400 hover:text-white transition-colors">Why AI Fails</a>
              <a href="https://www.igniteaisolutions.co.uk/services.html" className="text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="https://www.igniteaisolutions.co.uk/case-studies.html" className="text-gray-400 hover:text-white transition-colors">Case Studies</a>
              <div className="ml-4 px-5 py-2 rounded-full text-white bg-gradient-to-br from-[#FF5200] to-[#DC2626] font-bold shadow-[0_0_15px_rgba(255,82,0,0.5)] cursor-default">
                Readiness Scorecard
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center xl:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#0B0F19] border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="https://www.igniteaisolutions.co.uk/" className="block px-3 py-2 text-gray-400 hover:text-white">Home</a>
              <a href="https://www.igniteaisolutions.co.uk/services.html" className="block px-3 py-2 text-gray-400 hover:text-white">Services</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 relative z-10">
        
        {/* HERO HEADER */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-lg">
            The 70–85% AI Failure <br className="hidden md:block" />
            Rate Is Real. <br />
            <span className="text-[#FF5200]">Where Do You Stand?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            "It's not the technology that fails—it's the organisation. Find out if yours is ready."
            <span className="block mt-4 text-lg text-gray-400 font-normal">
              Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions.
            </span>
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          {[
            { 
              icon: BarChart3, 
              title: "Maturity Band", 
              desc: "See exactly where you sit on the AI maturity curve." 
            },
            { 
              icon: ShieldCheck, 
              title: "Readiness Score", 
              desc: "A clear score across the six dimensions that actually predict AI success." 
            },
            { 
              icon: Target, 
              title: "Strategic Priority", 
              desc: "Identify the single most critical area to focus on first." 
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 hover:border-[#FF5200]/30 transition-all duration-300 group">
              <div className="bg-[#FF5200]/10 p-4 rounded-full mb-6 group-hover:bg-[#FF5200]/20 transition-colors">
                <feature.icon className="w-8 h-8 text-[#FF5200]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="text-center">
          <Button 
            onClick={onStart} 
            className="text-xl px-12 py-5 shadow-2xl shadow-[#FF5200]/20"
          >
            Find Out Your Score <ArrowRight className="ml-3 w-6 h-6" />
          </Button>

          {/* TRUST BADGES (Small text below button) */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> No Credit Card Required</span>
            <span className="hidden md:inline">•</span>
            <span>Takes 3 Minutes</span>
            <span className="hidden md:inline">•</span>
            <span>GDPR Compliant</span>
          </div>
        </div>

      </main>

      {/* --- FOOTER (Matches Main Site) --- */}
      <footer className="border-t border-white/10 py-16 bg-black/80 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* AWARDS ROW */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 mb-12 border-b border-gray-900 pb-12">
                 <p className="text-gray-400 text-lg font-bold uppercase tracking-wider">Nominated for 3 Awards 2026:</p>
                 <div className="flex items-center gap-6">
                     <img src="/AI Awards 26.png" alt="National AI Awards" className="h-16 md:h-20 w-auto object-contain filter-none grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                 </div>
            </div>

            {/* INFO ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                      <h4 className="text-white font-bold mb-4">Ignite AI Solutions</h4>
                      <div className="not-italic text-gray-500 text-sm space-y-2">
                        <p>79 Queens Road</p>
                        <p>Richmond, Surrey</p>
                        <p>TW10 6HJ</p>
                        <p className="mt-2 text-gray-400">Company No: 16194166</p>
                      </div>
                </div>
                <div className="flex flex-col space-y-2 text-sm text-gray-500 items-center md:items-start">
                    <a href="https://www.igniteaisolutions.co.uk/services.html" className="hover:text-[#FF5200] transition-colors">Services & Pricing</a>
                    <a href="https://www.igniteaisolutions.co.uk/governance.html" className="hover:text-[#FF5200] transition-colors">Governance Frameworks</a>
                </div>
                <div className="flex flex-col space-y-2 text-sm text-gray-500 items-center md:items-start">
                    <p className="text-xs text-gray-600">© 2026 Ignite AI Solutions Ltd.<br/>Built for UK Business.</p>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
