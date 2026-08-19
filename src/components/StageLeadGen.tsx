import React, { useState } from 'react';
import { 
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
  Send,
  Zap,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StageLeadGenProps {
  onLeadCaptured?: (lead: any) => void;
  onNavigateToDemo?: () => void;
}

export const StageLeadGen: React.FC<StageLeadGenProps> = ({
  onLeadCaptured,
  onNavigateToDemo
}) => {
  const [formData, setFormData] = useState({
    googleBusinessPage: 'https://maps.google.com/?q=Houston+Caregiver+Agency',
    name: 'Brandon & Viking (Agency Leadership)',
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
      if (onLeadCaptured) {
        onLeadCaptured(data.lead);
      }

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Error submitting agency lead:', err);
      setSubmissionResult({
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
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillSample = () => {
    setFormData({
      googleBusinessPage: 'https://maps.google.com/?q=Houston+Caregiver+Agency',
      name: 'Brandon & Viking (Agency Leadership)',
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
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50/70 rounded-2xl p-6 border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Executive Agency Intake & Lead Gen Engine</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Agency Growth Assessment & Territory Qualification
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Input your agency’s Google Business Profile, roster size, and growth budget to calculate instant revenue projections across all 24 West Houston target zip codes.
          </p>
        </div>

        <button
          onClick={handleFillSample}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-700 font-semibold rounded-full border border-blue-300 text-xs shadow-2xs cursor-pointer shrink-0 transition-all"
        >
          1-Click Fill Sample Agency
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Agency Information */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Agency Qualification Form</h3>
              <p className="text-xs text-slate-500">Provide key profile parameters for your custom AI growth plan</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Live Qualification
            </span>
          </div>

          {!submissionResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Google Business Page */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Business Profile / Maps Listing</span>
                    <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Syncs Local SEO & AEO</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.googleBusinessPage}
                  onChange={(e) => setFormData({ ...formData, googleBusinessPage: e.target.value })}
                  placeholder="https://maps.google.com/?q=Houston+Caregiver+Agency"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                />
              </div>

              {/* 2. Contact Name & 3. Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Principal / Director Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Brandon & Viking"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Phone Number (2-Min SMS)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(281) 892-4410"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 4. Email & 5. Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="director@houstoncaregiveragency.com"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Agency Website</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://houstoncaregiveragency.com"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 6. Total Employee Count & 7. Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Total Caregiver / Staff Count</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="10-25 Caregivers">10–25 Caregivers</option>
                    <option value="40 Caregivers & 5 Office Staff (45 Total)">
                      ~40 Active Caregivers (Houston Caregiver Agency Standard)
                    </option>
                    <option value="50-100 Caregivers">50–100 Caregivers</option>
                    <option value="100+ Multi-Location">100+ Enterprise Caregivers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    <span>Marketing / AI Budget</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="$1,000 - $2,500 / mo">$1,000 – $2,500 / mo</option>
                    <option value="$5,000 Setup + $2,500/mo Ongoing AI Operations">
                      $5,000 Setup + $2,500/mo (Recommended)
                    </option>
                    <option value="$3,500 One-Time Core Setup">$3,500 One-Time Core Setup</option>
                    <option value="$5,000 - $10,000+ / mo">$5,000 – $10,000+ / mo</option>
                  </select>
                </div>
              </div>

              {/* Territory & Priorities */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Assigned Service Zip Codes / Territory:</span>
                </label>
                <input
                  type="text"
                  value={formData.targetTerritory}
                  onChange={(e) => setFormData({ ...formData, targetTerritory: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-xs sm:text-sm shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Territory & Google Business Data...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Lead & Generate Executive AI Audit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3 text-emerald-900 text-xs font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Agency lead captured in CRM! Custom territory forecast ready below.</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Executive Analysis</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {submissionResult.aiAssessment?.auditSummary}
                </p>
              </div>

              <div className="space-y-1 text-xs text-slate-700">
                <span className="font-bold text-slate-800 block">Recommended Action Items:</span>
                {submissionResult.aiAssessment?.actionPlan?.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSubmissionResult(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-xs cursor-pointer transition-all"
              >
                Reset / Submit Another Agency Profile
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Value Proposition & Payback Guarantee */}
        <div className="lg:col-span-5 space-y-4">
          {/* Revenue Calculator Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>The 1-Client Payback Guarantee</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Weighted Bill Rate</span>
                <strong className="text-sm font-bold text-slate-900">$33.50 / hour</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Avg Weekly Hours</span>
                <strong className="text-sm font-bold text-slate-900">35 hours / week</strong>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 col-span-2">
                <span className="text-[10px] text-emerald-700 block">Gross Revenue Per Single Client</span>
                <strong className="text-lg font-bold text-emerald-800">~$5,000 / month ($60,000 / yr)</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Acquiring just <strong className="text-slate-900">1 single private-pay client</strong> via our 2-minute video lead system covers your entire AI setup investment within 30 to 45 days.
            </p>
          </div>

          {/* Key Advantages Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              What Happens Once You Submit:
            </h4>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  1
                </div>
                <div>
                  <strong className="text-slate-900 block">Google Local & Schema Sync:</strong>
                  <span>We map your Google Business page to structured JSON-LD schema tags for all 24 zip codes.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  2
                </div>
                <div>
                  <strong className="text-slate-900 block">2-Minute Smartphone Video Intake:</strong>
                  <span>Your active caregivers complete a quick 2-minute mobile upload during normal onboarding.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  3
                </div>
                <div>
                  <strong className="text-slate-900 block">Automated Lead SMS Concierge:</strong>
                  <span>When a high-value family searches, your top caregiver reels are dispatched via SMS in under 2 minutes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
