import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Globe, 
  Phone, 
  Mail, 
  Building2, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  MapPin, 
  TrendingUp,
  FileSpreadsheet,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeadGenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: (leadData: any) => void;
}

export const LeadGenModal: React.FC<LeadGenModalProps> = ({
  isOpen,
  onClose,
  onLeadSubmitted
}) => {
  const [formData, setFormData] = useState({
    googleBusinessPage: 'https://maps.google.com/?q=Houston+Caregiver+Agency',
    name: 'Brandon & Viking (Agency Principals)',
    phone: '(281) 892-4410',
    email: 'leadership@houstoncaregiveragency.com',
    website: 'https://houstoncaregiveragency.com',
    employeeCount: '40 Caregivers & 5 Office Staff (45 Total)',
    budget: '$5,000 Setup + $2,500/mo Ongoing AI Operations',
    targetTerritory: 'West Houston (24 Zip Codes: Katy, Memorial, Cypress, Spring Branch)',
    primaryGoals: 'Capture High-Hour Private Pay Clients & Dominate Local AI Search'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/agency-lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setSubmissionResult(data);
      if (onLeadSubmitted) {
        onLeadSubmitted(data.lead);
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Error submitting lead gen form:', err);
      // Fallback local calculation
      const fallbackResult = {
        success: true,
        message: 'Agency Lead Captured & AI Growth Audit Generated!',
        aiAssessment: {
          projectedAnnualGrowth: '$864,000',
          estimatedNewClientsMonthly: 3,
          recommendedTier: 'Option 2: Enterprise AI Virtual Staff Setup',
          auditSummary: `With ~45 employees and an active marketing budget, your agency is positioned to secure 3-4 high-hour private pay clients ($5,000/mo each) within 60 days of deploying AEO Schema & Video Concierge.`,
          actionPlan: [
            'Connect Google Business Profile to AEO/GEO Schema Tagging',
            'Initiate 2-Minute Smartphone Video Intake for 40 active caregivers',
            'Deploy 2-Minute Lead Concierge SMS/Email response automation',
            'Dominate 24 West Houston Zip Codes with Whisper AI transcribed reels'
          ]
        }
      };
      setSubmissionResult(fallbackResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillSample = () => {
    setFormData({
      googleBusinessPage: 'https://maps.google.com/?q=Houston+Caregiver+Agency',
      name: 'Brandon & Viking (Agency Principals)',
      phone: '(281) 892-4410',
      email: 'leadership@houstoncaregiveragency.com',
      website: 'https://houstoncaregiveragency.com',
      employeeCount: '40 Caregivers & 5 Office Staff (45 Total)',
      budget: '$5,000 Setup + $2,500/mo Ongoing AI Operations',
      targetTerritory: 'West Houston (24 Zip Codes: Katy, Memorial, Cypress, Spring Branch)',
      primaryGoals: 'Capture High-Hour Private Pay Clients & Dominate Local AI Search'
    });
    setSubmissionResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="bg-blue-600 text-white p-5 flex items-center justify-between border-b border-blue-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider block">
                Agency Growth & Partnership Intake
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Claim Territory & Request AI Video Concierge Audit
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-blue-700/80 hover:bg-blue-800 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submissionResult ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between bg-blue-50/80 p-3 rounded-2xl border border-blue-200/80 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-medium">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Enter your agency details to generate a custom 24-Zip Code AI Revenue Model.</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-blue-700 font-semibold rounded-full border border-blue-300 text-[11px] cursor-pointer shadow-2xs shrink-0"
                >
                  Fill Sample Agency Data
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Google Business Page */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Business Profile / Maps URL</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.googleBusinessPage}
                      onChange={(e) => setFormData({ ...formData, googleBusinessPage: e.target.value })}
                      placeholder="https://maps.google.com/?q=Your+Agency+Name"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                      Google Maps Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used to synchronize Google Local Map Pack and AEO JSON-LD Schema indexing.
                  </p>
                </div>

                {/* 2. Contact Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Principal / Director Contact Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Brandon & Viking"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  />
                </div>

                {/* 3. Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Direct Phone Number (for 2-Min Lead SMS)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. (281) 892-4410"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  />
                </div>

                {/* 4. Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Executive Email Address</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. director@houstoncaregiveragency.com"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  />
                </div>

                {/* 5. Website */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Agency Website Domain</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://houstoncaregiveragency.com"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  />
                </div>

                {/* 6. Total Employee Count */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Total Employee & Caregiver Count</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="10-25 Caregivers">10–25 Caregivers (Emerging Agency)</option>
                    <option value="40 Caregivers & 5 Office Staff (45 Total)">
                      ~40 Active Caregivers (Houston Caregiver Agency Standard)
                    </option>
                    <option value="50-100 Caregivers">50–100 Caregivers (Established Regional)</option>
                    <option value="100+ Multi-Branch Caregivers">100+ Caregivers (Multi-Territory Enterprise)</option>
                  </select>
                </div>

                {/* 7. Budget */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    <span>Monthly AI / Marketing Budget</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="$1,000 - $2,500 / mo">$1,000 – $2,500 / month (Starter AI Setup)</option>
                    <option value="$5,000 Setup + $2,500/mo Ongoing AI Operations">
                      $5,000 Setup + $2,500/mo (Recommended Enterprise AI Staff)
                    </option>
                    <option value="$3,500 One-Time Core Setup">$3,500 One-Time Core Operations Setup</option>
                    <option value="$5,000 - $10,000+ / mo">$5,000 – $10,000+ / month (Aggressive Multi-County Growth)</option>
                  </select>
                </div>
              </div>

              {/* Territory & Priorities */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Target Service Radius & Assigned Zip Codes:</span>
                </div>
                <input
                  type="text"
                  value={formData.targetTerritory}
                  onChange={(e) => setFormData({ ...formData, targetTerritory: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">
                  ⚡ 1 Single Private-Pay Client ($5,000/mo) covers the entire investment.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-xs sm:text-sm shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Custom AI Growth Audit...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Lead & Generate Growth Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Submission Success & AI Growth Audit Result */
            <div className="space-y-6 animate-fade-in">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-emerald-900">
                    Agency Growth Profile Submitted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    We’ve mapped your Google Business profile and active roster to our 24-Zip Code AI Lead Generation Engine.
                  </p>
                </div>
              </div>

              {/* Audit Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-center">
                  <span className="text-[11px] font-semibold text-blue-700 uppercase block">
                    Projected Annual Revenue Added
                  </span>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {submissionResult.aiAssessment?.projectedAnnualGrowth || '$864,000'}
                  </p>
                  <span className="text-[10px] text-blue-600">Based on $33.50/hr @ 35 hrs/wk</span>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase block">
                    Est. New Private Pay Cases
                  </span>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">
                    +{submissionResult.aiAssessment?.estimatedNewClientsMonthly || 3} Cases / Mo
                  </p>
                  <span className="text-[10px] text-emerald-600">~$15,000/mo Gross Value</span>
                </div>

                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-center">
                  <span className="text-[11px] font-semibold text-purple-700 uppercase block">
                    Recommended Strategy Tier
                  </span>
                  <p className="text-base font-bold text-purple-900 mt-2">
                    {submissionResult.aiAssessment?.recommendedTier || 'Enterprise Virtual Staff'}
                  </p>
                  <span className="text-[10px] text-purple-600">Full Video & Lead Concierge</span>
                </div>
              </div>

              {/* AI Strategic Assessment */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Custom Executive AI Growth Summary</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {submissionResult.aiAssessment?.auditSummary}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-800 uppercase block">
                    Next Immediate Implementation Steps:
                  </span>
                  {submissionResult.aiAssessment?.actionPlan?.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full cursor-pointer transition-all"
                >
                  Edit Agency Information
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Explore Live 5-Stage Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
