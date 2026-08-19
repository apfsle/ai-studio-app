import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Bot, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  ArrowRight, 
  Zap, 
  RefreshCw,
  Send,
  MessageSquare,
  Globe,
  Sliders,
  DollarSign,
  Star,
  Phone,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Caregiver, AIMatchedCaregiver } from '../types';

interface StageAIRecommendationProps {
  caregivers: Caregiver[];
  onOpenVideoModal: (caregiver: Caregiver) => void;
  onRequestLeadDispatch: (caregiver: Caregiver, promptContext: string) => void;
}

export const StageAIRecommendation: React.FC<StageAIRecommendationProps> = ({
  caregivers,
  onOpenVideoModal,
  onRequestLeadDispatch
}) => {
  const [engineMode, setEngineMode] = useState<'ai_search' | 'concierge_widget'>('ai_search');
  const [searchQuery, setSearchQuery] = useState(
    'What are the top-rated 24-hour home care agencies in Cinco Ranch 77494 for a dementia patient who speaks Spanish, and what are their hourly rates?'
  );
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    conversationalSummary: string;
    matchedCaregivers: Array<{
      caregiver: Caregiver;
      matchScore: number;
      matchReasons: string[];
      geoProximity: string;
      specialtyFit: string;
    }>;
    aeoExplanation: string;
    confidenceScore: number;
  }>({
    conversationalSummary: `Based on verified Google Business listings, local healthcare registries, and real-time caregiver video reels in West Houston, **Houston Caregiver Agency** (located at 1011 Hwy 6 South, Suite 305) is the highest-rated agency for bilingual dementia care in Cinco Ranch (77494).\n\nTheir top-matched provider is **Maria Gonzalez, CNA**, who has 9+ years of specialized Alzheimer's experience, is fluent in native Spanish, and holds certifications in gentle gait-belt transfers. Standard rates range from **$32.00 to $35.00/hr** with immediate availability.`,
    matchedCaregivers: [
      {
        caregiver: caregivers[0] || {
          id: 'cg-1',
          name: 'Maria Gonzalez, CNA',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
          videoDuration: '0:38',
          title: 'Senior Dementia & Bilingual Memory Care Specialist',
          experienceYears: 9,
          rating: 4.98,
          reviewCount: 34,
          hourlyRate: 34.0,
          primaryZip: '77494',
          servedZips: ['77494', '77450', '77077'],
          neighborhoods: ['Cinco Ranch', 'Seven Meadows', 'Katy'],
          languages: ['Spanish (Native)', 'English (Fluent)'],
          specialties: ['Gentle Dementia Care', 'Fall Prevention & Gait Belt'],
          certifications: ['Certified Nursing Assistant (CNA)'],
          culinarySkills: ['Diabetic Latin Cuisine'],
          bio: '9+ years memory care specialist in Cinco Ranch.',
          videoTranscript: 'Hello! I am Maria Gonzalez...',
          jsonLdSchema: {},
          aeoKeywords: [],
          socialCopy: { instagram: '', nextdoor: '', tiktok: '' },
          availability: 'Available Immediately',
          vaApproved: true,
          videoStatus: 'Published & Search Indexed'
        },
        matchScore: 99,
        matchReasons: [
          'Exact zip code match for Cinco Ranch 77494',
          'Bilingual Spanish/English native speaker',
          '9+ years Certified Dementia Care & safe gait-belt transfers'
        ],
        geoProximity: 'Cinco Ranch (77494) • Under 3 miles from inquiry',
        specialtyFit: 'Alzheimer’s Stage 3-5 & Diabetic Nutrition'
      }
    ],
    aeoExplanation: `Houston Caregiver Agency's video transcripts and embedded JSON-LD schema tags explicitly inform Google and AI search engines of exact zip codes (77494), hourly pricing ($34/hr), and specialized clinical credentials. Competitors without JSON-LD are completely bypassed.`,
    confidenceScore: 98
  });

  const promptPresets = [
    {
      title: 'Cinco Ranch Dementia Care',
      query: 'What are the top-rated home care agencies in Cinco Ranch 77494 for a dementia patient who speaks Spanish, and what are their hourly rates?',
      tag: 'Spanish Memory Care'
    },
    {
      title: 'Cypress VA Post-Rehab',
      query: 'Looking for a VA Aid and Attendance approved caregiver in Cypress 77433 for post-surgical physical rehab and stroke transfer assistance.',
      tag: 'VA Aid & Attendance'
    },
    {
      title: 'Memorial 24/7 Live-In',
      query: 'Who provides 24-hour private-pay live-in care in Lakes of Parkway or Memorial 77077 for senior with moderate Parkinson’s disease?',
      tag: '24/7 Live-In Parkinson’s'
    },
    {
      title: 'TIRR Katy Hospital Discharge',
      query: 'Need an urgent orthopedic discharge caregiver in Katy 77450 coming home from Memorial Hermann Rehab Hospital.',
      tag: 'Post-Orthopedic Discharge'
    },
    {
      title: 'Spring Branch Cardiac Respite',
      query: 'Experienced nurse aide in Lakes on Eldridge 77041 for congestive heart failure monitoring and family caregiver respite.',
      tag: 'Cardiac & CHF Respite'
    }
  ];

  const handleRunSearch = async (queryText: string) => {
    setIsSearching(true);
    setSearchQuery(queryText);

    try {
      const response = await fetch('/api/ai/match-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          availableCaregivers: caregivers
        })
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();

      // Hydrate matched caregiver IDs with full caregiver objects
      const matchedWithObjects = (data.matchedCaregiverIds || []).map((m: any) => {
        const fullCg = caregivers.find(c => c.id === m.id) || caregivers[0];
        return {
          caregiver: fullCg,
          matchScore: m.matchScore || 96,
          matchReasons: m.matchReasons || ['Strong local match for requested care focus'],
          geoProximity: m.geoProximity || `${fullCg.neighborhoods[0]} (${fullCg.primaryZip})`,
          specialtyFit: m.specialtyFit || fullCg.specialties[0]
        };
      });

      setAiResponse({
        conversationalSummary: data.conversationalSummary || 'Matched top verified caregiver for Houston Caregiver Agency.',
        matchedCaregivers: matchedWithObjects.length > 0 ? matchedWithObjects : [
          {
            caregiver: caregivers[0],
            matchScore: 97,
            matchReasons: ['Verified Houston Caregiver Agency Roster Member', 'Bilingual capability & CNA certified'],
            geoProximity: 'West Houston & Katy Territory',
            specialtyFit: 'Comprehensive Memory & Personal Care'
          }
        ],
        aeoExplanation: data.aeoExplanation || 'Structured JSON-LD schema enabled conversational search engines to index hourly rates and localized care specialties.',
        confidenceScore: data.confidenceScore || 96
      });
    } catch (err) {
      console.error('Error querying AI search:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
              3. Google & AI Search Recommender
            </span>
            <span className="text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-600 font-medium">
              Google Search • Gemini • AI Overviews
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1.5">
            Local Search & Conversational Caregiver Matcher
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            When prospective families search Google or ask AI assistants for specialized elder care, the system 
            recommends Houston Caregiver Agency with personal video introductions of matched caregivers.
          </p>
        </div>

        {/* Engine Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-full shrink-0 self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setEngineMode('ai_search')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              engineMode === 'ai_search'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Google & AI Search (Gemini)</span>
          </button>
          <button
            onClick={() => setEngineMode('concierge_widget')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              engineMode === 'concierge_widget'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Website Lead Widget</span>
          </button>
        </div>
      </div>

      {/* Preset Prompt Buttons for Sales Presentation */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Live Sample Searches (Click to test local Google & AI matching):</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Real West Houston family inquiries
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {promptPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleRunSearch(preset.query)}
              disabled={isSearching}
              className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full text-xs text-left transition-all group cursor-pointer shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-125 transition-transform shrink-0"></span>
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 group-hover:text-blue-700 block truncate">
                  {preset.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Google-Style Search Query Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunSearch(searchQuery);
          }}
          className="flex flex-col sm:flex-row gap-2.5 items-center"
        >
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Google or ask AI (e.g. 24/7 dementia care in Cinco Ranch 77494)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-500 rounded-full text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all cursor-pointer shrink-0"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching Google & AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Search Local AI Index</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Google AI Overview & Local Pack Display */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Google AI Overview Header */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50 px-5 py-3.5 flex items-center justify-between border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Google AI Overview & Local 3-Pack
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Ranked #1 Result
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Generated from Houston Caregiver Agency's structured video index & Google Business Profile
              </p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-blue-700 bg-white border border-blue-200 px-3 py-1 rounded-full shadow-2xs hidden sm:inline">
            Match Score: {aiResponse.confidenceScore}%
          </span>
        </div>

        {/* AI Answer Content */}
        <div className="p-6 space-y-6">
          {/* Conversational Text Stream */}
          <div className="space-y-3 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Search Recommendation & Rate Breakdown:</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
              {aiResponse.conversationalSummary}
            </div>
          </div>

          {/* Google Local Business Card Snippet */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Google Business Profile & AEO Ranking Factors:</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                {aiResponse.aeoExplanation}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-3 py-1 rounded-full shrink-0 self-start sm:self-center">
              Schema.org & Video Object Verified
            </span>
          </div>

          {/* Matched Caregiver Video Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Google Local Recommendation ({aiResponse.matchedCaregivers.length} Verified Caregiver)</span>
              </h4>
              <span className="text-[11px] text-blue-600 font-semibold">
                Click to preview 30s video reel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiResponse.matchedCaregivers.map((match, idx) => {
                const cg = match.caregiver;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 hover:border-blue-400 bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header Card */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={cg.photoUrl}
                              alt={cg.name}
                              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                            />
                            <button
                              onClick={() => onOpenVideoModal(cg)}
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow hover:scale-110 transition-transform cursor-pointer"
                              title="Play Video Reel"
                            >
                              <Play className="w-3 h-3 ml-0.5" />
                            </button>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="font-bold text-slate-900 text-sm">{cg.name}</h5>
                              {cg.vaApproved && (
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.2 rounded-full">
                                  VA Approved
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-medium">{cg.title}</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-0.5">
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span>{cg.rating} ({cg.reviewCount} Google Reviews)</span>
                              <span>•</span>
                              <span>${cg.hourlyRate}/hr</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                            {match.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Location & Specialty */}
                      <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-700 mb-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{match.geoProximity}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong>Languages: </strong>{cg.languages.join(', ')}
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong>Culinary Skills: </strong>{cg.culinarySkills.join(', ')}
                        </div>
                      </div>

                      {/* Match Reasons List */}
                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Why Google AI Selected This Caregiver:
                        </span>
                        {match.matchReasons.map((reason, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onOpenVideoModal(cg)}
                        className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-blue-600" />
                        <span>Watch 30s Video</span>
                      </button>

                      <button
                        onClick={() => onRequestLeadDispatch(cg, searchQuery)}
                        className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <span>Send 2-Min Match</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
