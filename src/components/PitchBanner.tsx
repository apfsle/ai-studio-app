import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2, Video, Search } from 'lucide-react';

interface PitchBannerProps {
  onOpenTour: () => void;
  onNavigateToROI: () => void;
  onOpenLeadGen?: () => void;
}

export const PitchBanner: React.FC<PitchBannerProps> = ({ onOpenTour, onNavigateToROI, onOpenLeadGen }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50/90 via-white to-indigo-50/60 rounded-2xl p-5 md:p-6 mb-6 shadow-xs border border-blue-100/90">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Google Local Search & AI Video Growth Strategy</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            Turn Caregiver Videos into <span className="text-blue-600">High-Ranking Local Search Assets</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            When families in Cinco Ranch, Memorial, or Bridgeland search Google or ask AI for specialized in-home care, 
            our embedded <strong className="text-slate-900 font-semibold">JSON-LD Schema</strong> and <strong className="text-slate-900 font-semibold">Short-Form Video Profiles</strong> ensure 
            Houston Caregiver Agency is recommended instantly—dispatched within 2 minutes to convert high-margin private pay cases.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agency Bill Rate: <strong className="text-slate-900">$33.50/hr</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avg Case Value: <strong className="text-slate-900">$5,000/mo</strong> (35 hrs/wk)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Payback: <strong className="text-slate-900">1 single client</strong> covers full AI setup</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row lg:flex-col items-center sm:items-end gap-2.5 w-full lg:w-auto shrink-0">
          <button
            onClick={onOpenLeadGen}
            className="flex-1 lg:flex-none w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Agency Lead Gen Form</span>
          </button>
          
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={onOpenTour}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-full text-xs border border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <span>Sales Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onNavigateToROI}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-full text-xs border border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>ROI Model</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
