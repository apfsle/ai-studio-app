import React from 'react';
import { 
  Sparkles, 
  Video, 
  Search, 
  Users, 
  MapPin, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Presentation,
  Play
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTour: () => void;
  onRunFastSimulation: () => void;
  onOpenLeadGen: () => void;
  isSimulating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTour,
  onRunFastSimulation,
  onOpenLeadGen,
  isSimulating
}) => {
  const navItems = [
    { id: 'intake', label: '1. Creator Ingest Pipeline', shortLabel: '1. Video Ingest', icon: Video, badge: 'Direct & Email' },
    { id: 'video-ai', label: '2. AI Video & GEO/AEO Indexing', shortLabel: '2. Video SEO & Schema', icon: Sparkles, badge: 'JSON-LD' },
    { id: 'ai-search', label: '3. Google & AI Search Matcher', shortLabel: '3. AI Matcher', icon: Search, badge: 'Live Discovery' },
    { id: 'crm', label: '4. Automated Lead CRM', shortLabel: '4. Lead CRM', icon: Users, badge: 'Auto-Qualified' },
    { id: 'territory-roi', label: '5. Territory & ROI Scaling', shortLabel: '5. Territory ROI', icon: BarChart3, badge: '24 Zip Codes' },
    { id: 'lead-gen', label: '6. Agency Growth Lead Gen', shortLabel: '6. Lead Gen Form', icon: ShieldCheck, badge: 'Audit & Intake' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Google-Style Status & Trust Bar */}
      <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-8 py-1.5 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Google Local Business Verified</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-blue-700 font-medium hidden sm:inline">24 West Houston Zip Codes</span>
          <span className="text-slate-300 hidden md:inline">•</span>
          <span className="text-slate-600 font-medium hidden md:inline">Weighted Avg $33.50/hr</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLeadGen}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Agency Lead Gen Form</span>
          </button>

          <button
            onClick={onOpenTour}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-300 transition-all cursor-pointer shadow-2xs"
          >
            <Presentation className="w-3.5 h-3.5 text-blue-600" />
            <span>Sales Deck</span>
          </button>
        </div>
      </div>

      {/* Main Agency Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/20 shrink-0">
              <span className="tracking-tight">H</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  Houston Caregiver Agency
                </h1>
                <span className="hidden sm:inline-flex text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                  AI Video & Local Search
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Video-First Care Matching & Local SEO Automation
              </p>
            </div>
          </div>

          {/* Quick Action Demo Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRunFastSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                isSimulating 
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isSimulating ? 'Simulating Pipeline...' : 'Launch Live Demo'}</span>
            </button>
          </div>
        </div>

        {/* Stage Tabs Bar */}
        <div className="flex space-x-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
                <span className="inline md:hidden">{item.shortLabel}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
