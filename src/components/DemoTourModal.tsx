import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Presentation, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Video, 
  Search, 
  Users, 
  MapPin, 
  ShieldCheck,
  Play
} from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStage: (stage: string) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToStage
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      step: 'Executive Partnership Vision',
      title: 'Dominating West Houston with AI as Virtual Staff',
      stageId: 'intake',
      badge: 'Opening Hook',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Your greatest competitive advantage isn’t a generic corporate brand—it is <strong className="text-slate-900">human trust, response speed, and specialized localized capability</strong>.
          </p>
          <p>
            When a family in Cinco Ranch, Memorial, or Bridgeland urgently needs care for an aging parent, they are asking conversational AI engines:
          </p>
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs font-semibold text-blue-900 space-y-1">
            <div>• “Does this caregiver speak my parent’s native language?”</div>
            <div>• “Can they prepare regional or diabetic cuisines suited to my father’s health needs?”</div>
            <div>• “Do they hold verified experience in gentle dementia care, gait-belt transfers, or post-stroke rehab?”</div>
          </div>
          <p>
            We transform your active roster of <strong>~40 caregivers into dynamic client-acquisition assets</strong> across all 24 assigned service zip codes.
          </p>
        </div>
      ),
      talkingPoint: 'Tell Brandon & Viking: "Instead of running generic ads or hiring marketing staff, we turn your 40 caregivers into automated video assets that dominate AI search engines."'
    },
    {
      step: 'Stage 1: Autonomous Caregiver Intake',
      title: 'Zero Administrative Overhead for Your Office Team',
      stageId: 'intake',
      badge: 'Stage 1: Intake',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Caregivers simply complete a <strong className="text-slate-900">2-minute mobile smartphone form</strong> or email their 30-second introduction video to <code className="text-blue-600 font-bold">videos@houstoncaregivers.ai</code> during normal onboarding.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block">Captures:</strong>
              <span>Languages, clinical skills, culinary specialties, and exact service zip codes.</span>
            </div>
            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block">Zero Drag:</strong>
              <span>No office staff time required to re-format, edit, or upload.</span>
            </div>
          </div>
        </div>
      ),
      talkingPoint: 'Demonstrate the mobile smartphone screen and the email-in gateway to show how easy it is for their current 40 caregivers.'
    },
    {
      step: 'Stage 2: AI Video & Search Indexing',
      title: 'Whisper AI & Embedded JSON-LD Schema',
      stageId: 'video-ai',
      badge: 'Stage 2: AI Indexing',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Our engine automatically transcribes the audio with Whisper AI, styles animated karaoke captions, reformats to 9:16 vertical reels for Meta/Nextdoor, and embeds <strong className="text-purple-700">JSON-LD Schema code</strong>.
          </p>
          <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs text-purple-900">
            <strong>Why JSON-LD is your ultimate unfair advantage:</strong> AI search engines (ChatGPT, Gemini, Perplexity) cannot "read" websites like humans. JSON structures your pricing ($32-$35/hr), 24 zip codes, VA approval, and caregiver skills so AI engines bypass competitors and recommend Houston Caregiver Agency directly.
          </div>
        </div>
      ),
      talkingPoint: 'Show them the JSON-LD Schema code tab and the 9:16 video player with dynamic captions.'
    },
    {
      step: 'Stage 3 & 4: Instant 2-Minute Lead Concierge',
      title: 'Profound Emotional Trust Delivered in 2 Minutes',
      stageId: 'crm',
      badge: 'Stage 3 & 4: Conversion',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            When a family searches or submits an inquiry, our AI parses their care needs. 
            Within <strong className="text-emerald-700">2 minutes</strong>, an automated SMS/Email delivers video introductions of 2–3 perfectly matched caregivers.
          </p>
          <p>
            You build profound emotional trust before a competitor even picks up the phone. Leads are instantly qualified in your CRM at <strong className="text-slate-900">~$5,000/month gross client value</strong>.
          </p>
        </div>
      ),
      talkingPoint: 'Trigger a live query in the AI Search simulation, then show the automated SMS message dispatched on the iPhone screen in the CRM.'
    },
    {
      step: 'Part 4: Financial Scaling & 1-Client Payback',
      title: 'High-Margin Scaling from $1.74M to $3.66M',
      stageId: 'territory-roi',
      badge: 'Closing Close',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300 text-xs space-y-1">
            <div className="font-bold text-emerald-950 text-sm">The 1-Client Payback Model:</div>
            <div className="text-emerald-900">
              Weighted Bill Rate: <strong>$33.50 / hr</strong> • Avg Schedule: <strong>35 hrs / wk</strong> • Gross Revenue: <strong>~$5,000 / month per client</strong>
            </div>
            <p className="text-emerald-950 font-bold mt-1">
              Acquiring just ONE single additional private-pay client covers the entire setup investment within 30 to 45 days and permanently funds ongoing AI operations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-100 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Baseline (40 CGs)</span>
              <strong className="text-slate-900">$1.74M / yr</strong>
            </div>
            <div className="bg-slate-100 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Tier 1 (60 CGs)</span>
              <strong className="text-emerald-700">$2.60M / yr</strong>
            </div>
            <div className="bg-slate-100 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Tier 2 (80 CGs)</span>
              <strong className="text-purple-700">$3.66M / yr</strong>
            </div>
          </div>
        </div>
      ),
      talkingPoint: 'Propose Option 2 ($5,000 Enterprise Setup) + $2,500/mo Fractional Director Retainer and complete the Agency Lead Gen intake.'
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="bg-blue-600 text-white p-5 flex items-center justify-between border-b border-blue-700">
          <div className="flex items-center gap-2.5">
            <Presentation className="w-5 h-5 text-blue-100" />
            <div>
              <span className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider block">
                Live Sales Pitch Presentation Mode
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Houston Caregiver Agency • Strategic Blueprint Walkthrough
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

        {/* Slide Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full uppercase">
                Slide {currentSlide + 1} of {slides.length} • {current.badge}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">{current.title}</h4>
            </div>
          </div>

          {current.content}

          {/* Presenter Talking Point */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 mb-1 uppercase text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Presenter Key Note (What to say right now):</span>
            </span>
            <p className="text-amber-900 font-medium leading-relaxed">
              {current.talkingPoint}
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-500 font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onJumpToStage(current.stageId);
                onClose();
              }}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-full transition-all cursor-pointer shadow-2xs"
            >
              Jump to Stage
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Slide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onJumpToStage('territory-roi');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Full ROI Model</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
