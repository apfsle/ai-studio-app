import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Building2, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Sliders, 
  Sparkles,
  Layers,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { TERRITORY_CLUSTERS, REFERRAL_PARTNERS } from '../data/mockData';
import { TerritoryCluster } from '../types';

interface StageTerritoryROIProps {
  onOpenLeadGen?: () => void;
}

export const StageTerritoryROI: React.FC<StageTerritoryROIProps> = ({ onOpenLeadGen }) => {
  const [selectedCluster, setSelectedCluster] = useState<TerritoryCluster>(TERRITORY_CLUSTERS[0]);
  
  // Interactive Financial Simulator State
  const [caregiverCount, setCaregiverCount] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(33.50);
  const [weeklyHoursPerCaregiver, setWeeklyHoursPerCaregiver] = useState<number>(25);

  // Dynamic Financial Calculations
  const weeklyTotalHours = caregiverCount * weeklyHoursPerCaregiver;
  const monthlyRevenue = weeklyTotalHours * hourlyRate * 4.33;
  const annualRunRate = monthlyRevenue * 12;

  // Single Client Value (at 35 hrs/wk average schedule)
  const singleClientMonthlyValue = 35 * hourlyRate * 4.33;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
              5. Territory & Financial Model
            </span>
            <span className="text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-600 font-medium">
              24 Zip Codes • $1.74M - $3.66M Roadmap
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1.5">
            Houston Territory Analysis & Rapid Payback Economics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Hyper-localized targeting across 24 West Houston zip codes paired with institutional hospital pipelines 
            (TIRR Memorial Hermann, Methodist, VibraLife) and a proven 1-client payback model.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2.5 text-right shrink-0">
          <span className="text-[11px] font-semibold text-emerald-800 block">Unit Economics Payback</span>
          <span className="text-xs font-bold text-emerald-950">1 Client = Full Setup Paid in 30-45 Days</span>
        </div>
      </div>

      {/* 24 Zip Codes & Territory Map Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              West Houston 24 Zip Code Territory Architecture
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            5 Strategic Micro-Community Clusters
          </span>
        </div>

        {/* Cluster Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {TERRITORY_CLUSTERS.map((cluster) => {
            const isSelected = selectedCluster.id === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-950 border-2 border-blue-600 shadow-2xs font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p className="text-xs font-bold truncate">{cluster.name}</p>
                <p className={`text-[10px] mt-1 truncate ${isSelected ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>
                  {cluster.keyZipCodes.slice(0, 3).join(', ')}...
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold">
                  <span className="text-slate-600">{cluster.activeCaregiversCount} Caregivers</span>
                  <span className={isSelected ? 'text-blue-800 font-bold' : 'text-emerald-700 font-bold'}>
                    {cluster.clientCount} Clients
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive Card */}
        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Cluster Focus
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1">{selectedCluster.name}</h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-700">Covered Zip Codes:</span>
              <span className="font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                {selectedCluster.keyZipCodes.join(', ')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block text-[10px] uppercase font-mono">
                Target Luxury Subdivisions & Enclaves
              </span>
              <p className="font-bold text-slate-800 leading-relaxed">
                {selectedCluster.targetSubdivisions.join(' • ')}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block text-[10px] uppercase font-mono">
                Strategic Care Focus
              </span>
              <p className="font-bold text-indigo-900 leading-relaxed">
                {selectedCluster.strategicCareFocus}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block text-[10px] uppercase font-mono">
                Institutional Hospital / Referral Anchor
              </span>
              <p className="font-bold text-green-900 leading-relaxed">
                {selectedCluster.topHospitalReferral}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Referral Network Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Institutional Referral Network Architecture
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Direct Post-Rehab & High-Hour Case Pipelines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {REFERRAL_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900 text-xs">{partner.name}</h5>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded shrink-0">
                    {partner.zipCode}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">
                  {partner.category} • {partner.location}
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  {partner.primaryCaregiverFocus}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Est. Lead Volume:</span>
                <span className="font-bold text-emerald-700">~{partner.leadVolumeMonthly} cases / mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Scaling Dynamics & Interactive Calculator */}
      {/* Interactive Financial Scaling Dynamics & Rapid Payback Model */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/90 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70 inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Financial Scaling Dynamics & Rapid Payback Model</span>
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Caregiver Capacity Multiplier & Revenue Projection
            </h3>
          </div>
          <div className="text-xs text-slate-500 max-w-md">
            Scaling active roster multiplies gross revenue while leveraging existing fixed agency overhead.
          </div>
        </div>

        {/* Growth Phase Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Baseline */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase">Baseline Operations</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">Current</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">$1.74 Million</p>
            <p className="text-xs text-slate-500">Annual Run-Rate (~$145,000 / mo)</p>
            <div className="pt-2.5 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <div>Active Caregivers: <strong className="text-slate-900">40 Caregivers</strong></div>
              <div>Weekly Billable Hours: <strong className="text-slate-900">~1,000 hours</strong></div>
            </div>
          </div>

          {/* Tier 1 */}
          <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-200/80 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase">Tier 1 Expansion</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                +49% Growth
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">$2.60 Million</p>
            <p className="text-xs text-slate-500">Annual Run-Rate (~$217,000 / mo)</p>
            <div className="pt-2.5 border-t border-emerald-100 text-xs text-slate-600 space-y-1">
              <div>Active Caregivers: <strong className="text-slate-900">60 Caregivers</strong></div>
              <div>Weekly Billable Hours: <strong className="text-slate-900">~1,500 hours</strong></div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200/80 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase">Tier 2 Market Scale</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                +110% Scale
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-700">$3.66 Million</p>
            <p className="text-xs text-slate-500">Annual Run-Rate (~$305,000 / mo)</p>
            <div className="pt-2.5 border-t border-blue-100 text-xs text-slate-600 space-y-1">
              <div>Active Caregivers: <strong className="text-slate-900">80 Caregivers</strong></div>
              <div>Weekly Billable Hours: <strong className="text-slate-900">~2,100 hours</strong></div>
            </div>
          </div>
        </div>

        {/* Interactive Custom Sliders */}
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Sliders className="w-4 h-4" />
              <span>Interactive Roster & Rate Simulator:</span>
            </span>
            <span className="text-slate-500 font-normal hidden sm:inline">
              Adjust variables to test custom agency scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Caregiver Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Active Caregivers:</span>
                <span className="text-slate-900 font-bold">{caregiverCount} Caregivers</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={caregiverCount}
                onChange={(e) => setCaregiverCount(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Weighted Hourly Bill Rate:</span>
                <span className="text-slate-900 font-bold">${hourlyRate.toFixed(2)} / hr</span>
              </div>
              <input
                type="range"
                min="30"
                max="40"
                step="0.5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Slider 3: Hours Per Caregiver */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Avg Weekly Hours / Caregiver:</span>
                <span className="text-slate-900 font-bold">{weeklyHoursPerCaregiver} hrs/wk</span>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={weeklyHoursPerCaregiver}
                onChange={(e) => setWeeklyHoursPerCaregiver(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Calculation Result Callout */}
          <div className="mt-4 p-4 rounded-xl bg-blue-50/80 border border-blue-200/90 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-blue-900 block font-medium">Simulated Monthly Gross Revenue:</span>
              <span className="text-2xl font-bold text-emerald-700">${Math.round(monthlyRevenue).toLocaleString()} / mo</span>
            </div>
            <div>
              <span className="text-xs text-blue-900 block font-medium">Simulated Annualized Gross Run-Rate:</span>
              <span className="text-2xl font-bold text-slate-900">${Math.round(annualRunRate).toLocaleString()} / yr</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-blue-900 block font-medium">Weekly Billable Hours:</span>
              <span className="text-lg font-bold text-blue-700">{weeklyTotalHours.toLocaleString()} hrs / wk</span>
            </div>
          </div>
        </div>

        {/* The 1-Client Payback Proof Callout */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>The Unit Economics & Rapid Payback Model</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            Standard Hourly Bill Rate: <strong>${hourlyRate.toFixed(2)}/hr</strong> | Average Schedule: <strong>35 hours/week</strong> | Gross Revenue Per Client: <strong>~${Math.round(singleClientMonthlyValue).toLocaleString()} / month</strong>
          </p>
          <div className="bg-white rounded-xl p-3.5 text-xs text-slate-700 font-normal border border-emerald-200 shadow-2xs">
            <strong className="text-emerald-900 font-semibold">ROI Conclusion:</strong> Acquiring just <strong className="text-slate-900">ONE single additional private-pay client</strong> covers the entire setup investment within 30 to 45 days and permanently funds ongoing AI operations. This model eliminates financial risk by tying technology directly to high-margin revenue generation.
          </div>
        </div>

        {/* Implementation Service Tiers */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900">Implementation Service Tiers:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase">Option 1</div>
              <div className="text-xl font-bold text-slate-900">$3,500 <span className="text-xs font-normal text-slate-500">One-Time</span></div>
              <p className="text-xs font-semibold text-slate-800">Core AI Operations Setup</p>
              <p className="text-[11px] text-slate-500">
                Mobile profiling, custom database, cloud media optimization, JSON-LD schema tagging & webhook lead routing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/40 border-2 border-blue-600 space-y-2 relative shadow-xs">
              <div className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Recommended
              </div>
              <div className="text-xs font-bold text-blue-700 uppercase">Option 2</div>
              <div className="text-xl font-bold text-slate-900">$5,000 <span className="text-xs font-normal text-slate-500">One-Time</span></div>
              <p className="text-xs font-bold text-blue-900">Enterprise AI Virtual Staff Setup</p>
              <p className="text-[11px] text-slate-600">
                Everything in Option 1 + Whisper AI video pipeline (captions, 9:16 vertical reels), AI copywriting engine & 2-Minute Lead Concierge SMS/Email auto-matching.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase">Ongoing Partnership</div>
              <div className="text-xl font-bold text-slate-900">$2,500 <span className="text-xs font-normal text-slate-500">/ Month</span></div>
              <p className="text-xs font-semibold text-slate-800">Fractional Director of AI Operations</p>
              <p className="text-[11px] text-slate-500">
                Active management of organic/geofenced campaigns, monthly caregiver video processing, continuous AI search maintenance & lead algorithm calibration.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Kickoff CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white shadow-xs">
          <div>
            <div className="text-xs font-semibold text-blue-100 uppercase flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Steps & Agency Partnership Kickoff</span>
            </div>
            <p className="text-sm font-bold text-white">
              Claim Your 24 West Houston Zip Codes with Option 2 Enterprise AI Virtual Staff
            </p>
            <p className="text-xs text-blue-100/90 mt-0.5">
              Submit your Google Business page, employee count, and growth budget to lock in territory exclusivity.
            </p>
          </div>
          <button
            onClick={onOpenLeadGen}
            className="text-xs text-blue-900 font-bold bg-white hover:bg-slate-100 px-5 py-2.5 rounded-full shrink-0 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Open Agency Lead Gen Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
