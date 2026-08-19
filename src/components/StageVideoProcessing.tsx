import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Share2, 
  Search, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  FileText, 
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';
import { Caregiver } from '../types';

interface StageVideoProcessingProps {
  caregivers: Caregiver[];
  selectedCaregiver: Caregiver;
  onSelectCaregiver: (caregiver: Caregiver) => void;
  onProceedToAISearch: () => void;
}

export const StageVideoProcessing: React.FC<StageVideoProcessingProps> = ({
  caregivers,
  selectedCaregiver,
  onSelectCaregiver,
  onProceedToAISearch
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'video' | 'jsonld' | 'aeo' | 'social'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedSocial, setCopiedSocial] = useState<'ig' | 'nd' | 'tt' | null>(null);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedCaregiver.jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleCopySocial = (platform: 'ig' | 'nd' | 'tt', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSocial(platform);
    setTimeout(() => setCopiedSocial(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-tighter bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded uppercase">
              2. AI SEO & Semantic Indexing
            </span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold font-mono tracking-tighter uppercase">
              WHISPER AI • 9:16 REELS • JSON-LD
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mt-1">
            AI Video Formatting & Autonomous Search Indexing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Raw employee videos are automatically transcribed, styled with captions, and embedded with JSON-LD schema tags 
            telling ChatGPT, Gemini, and Perplexity your exact service zip codes, $32–$35/hr rates, and clinical capabilities.
          </p>
        </div>

        <button
          onClick={onProceedToAISearch}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Test in AI Search Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Caregiver Profile Selector Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Select Active Caregiver to Inspect Video SEO & Schema Tags:</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            40 Roster Profiles Indexed
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {caregivers.map((cg) => {
            const isSelected = selectedCaregiver.id === cg.id;
            return (
              <button
                key={cg.id}
                onClick={() => onSelectCaregiver(cg)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-900 border-2 border-blue-600 shadow-2xs font-semibold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <img
                  src={cg.photoUrl}
                  alt={cg.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{cg.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {cg.primaryZip} • {cg.neighborhoods[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video & Schema Inspector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 pt-3 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveViewTab('video')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeViewTab === 'video'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs -mb-[1px] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>9:16 Video Player & Smart Captions</span>
          </button>

          <button
            onClick={() => setActiveViewTab('jsonld')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeViewTab === 'jsonld'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs -mb-[1px] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>JSON-LD Schema (Google Structured Data)</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.2 rounded-full font-semibold">
              Schema.org
            </span>
          </button>

          <button
            onClick={() => setActiveViewTab('aeo')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeViewTab === 'aeo'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs -mb-[1px] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>AEO / GEO & Video Search Titles</span>
          </button>

          <button
            onClick={() => setActiveViewTab('social')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeViewTab === 'social'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs -mb-[1px] font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Multi-Channel Social Reels</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* TAB 1: 9:16 Video Player */}
          {activeViewTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 9:16 Simulated Video Phone Player */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[300px] aspect-[9/16] bg-slate-900 rounded-[32px] overflow-hidden relative shadow-xl border-4 border-slate-700 flex flex-col justify-between p-3 text-white">
                  {/* Top Bar Overlay */}
                  <div className="flex items-center justify-between z-20">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Houston Caregiver Agency</span>
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Video Media Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={selectedCaregiver.photoUrl}
                      alt={selectedCaregiver.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform backdrop-blur-xs cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </button>
                    {isPlaying && (
                      <span className="mt-2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-emerald-300 font-mono">
                        Playing • 0:14 / {selectedCaregiver.videoDuration}
                      </span>
                    )}
                  </div>

                  {/* Bottom Captions & Caregiver Details */}
                  <div className="relative z-20 space-y-2">
                    {/* Animated Karaoke Caption Box */}
                    <div className="bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/15 text-center shadow-lg">
                      <p className="text-[11px] font-bold text-amber-300 tracking-wide leading-tight">
                        “...whether your mother needs Spanish memory care or safe gait-belt transfers...”
                      </p>
                      <span className="text-[9px] text-slate-300 mt-0.5 block">
                        ⚡ AI Auto-Generated Synchronized Subtitles
                      </span>
                    </div>

                    {/* Caregiver Name Badge */}
                    <div className="bg-gradient-to-r from-slate-900/95 to-blue-950/95 rounded-xl p-2.5 border border-blue-400/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{selectedCaregiver.name}</span>
                        <span className="text-[10px] text-blue-300 font-bold bg-blue-500/20 px-1.5 py-0.5 rounded">
                          ${selectedCaregiver.hourlyRate}/hr
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5 truncate">
                        {selectedCaregiver.neighborhoods.join(', ')} ({selectedCaregiver.primaryZip})
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCaregiver.specialties.slice(0, 2).map((s, i) => (
                          <span key={i} className="text-[8px] bg-white/15 px-1.5 py-0.2 rounded text-slate-200 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Audio Diarization & Pipeline Telemetry */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Whisper AI Diarized Audio Transcript
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Duration: {selectedCaregiver.videoDuration}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                    {selectedCaregiver.videoTranscript}
                  </div>
                </div>

                {/* Micro-Community & Clinical Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Target Subdivisions (GEO)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCaregiver.neighborhoods.map((n, i) => (
                        <span key={i} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {n}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Zip Codes: {selectedCaregiver.servedZips.join(', ')}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCaregiver.certifications.map((c, i) => (
                        <span key={i} className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pipeline Stats Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Status: </span>
                    <span className="font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Google Search Indexed
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium">
                    Format: <strong className="text-slate-900">9:16 Vertical Reel</strong>
                  </div>
                  <div className="text-slate-600 font-medium">
                    Schema Embed: <strong className="text-blue-700">MedicalBusiness (Active)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JSON-LD Schema Code Inspector */}
          {activeViewTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 text-slate-800 p-4 rounded-xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Schema.org JSON-LD: How Google & AI Engines Read Caregiver Roster</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                    When families ask Google or AI: <em>"What are the top-rated home care agencies in 77494 or 77077 for a stroke patient, and what are their hourly rates?"</em>
                    search bots read this structured data to directly display Houston Caregiver Agency in Local 3-Packs and AI Overviews.
                  </p>
                </div>

                <button
                  onClick={handleCopySchema}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer shadow-2xs"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy JSON-LD Code'}</span>
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-96 border border-slate-800 leading-relaxed shadow-xs">
                <div className="text-slate-400 mb-2 font-sans font-medium text-[11px] flex items-center justify-between">
                  <span>&lt;!-- Embedded in page head tag for Google & AI Search Crawlers --&gt;</span>
                  <span className="text-emerald-400 text-[10px]">Valid Schema.org Structure</span>
                </div>
                <pre>{JSON.stringify(selectedCaregiver.jsonLdSchema, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: AEO / GEO Entity Keywords & Title/Description Showcase */}
          {activeViewTab === 'aeo' && (
            <div className="space-y-6">
              {/* Architecture Explanation Banner */}
              <div className="p-5 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 rounded-2xl border border-blue-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      How AI Automates AEO / GEO, Meta Tags & Local Search Ranking
                    </h4>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    Zero Manual SEO Labor
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      1. Whisper AI Diarization
                    </span>
                    Extracts acoustic transcript, detects spoken language (Spanish, English, Vietnamese), diagnoses care skills, and tags local landmarks.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      2. Semantic Entity Embedding
                    </span>
                    Maps 24 micro-zip codes (77494, 77077, etc.), hourly rates ($32–$35/hr), and VA Aid & Attendance accreditation to Knowledge Graph nodes.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      3. Google AI Overviews & GEO
                    </span>
                    Injects Schema.org JSON-LD & meta headers so Google AI Overviews and Gemini directly cite Houston Caregiver Agency as the #1 provider.
                  </div>
                </div>
              </div>

              {/* Example Optimized Video Titles & Descriptions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Automated Video Titles & Long-Tail Descriptions (Channel Ready)
                  </h4>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    Generated for: {selectedCaregiver.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* YouTube Shorts & Google Video Search */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5" />
                        YouTube Shorts & Google Video SEO
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-semibold">
                        9:16 Vertical
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">Optimized Title:</span>
                      <p className="text-xs font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200 mt-1">
                        {selectedCaregiver.neighborhoods[0]} In-Home {selectedCaregiver.specialties[0] || 'Care'} | {selectedCaregiver.name} | Houston Caregiver Agency (${selectedCaregiver.hourlyRate}/hr)
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">Structured Description:</span>
                      <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 mt-1 leading-relaxed">
                        Meet {selectedCaregiver.name}, {selectedCaregiver.title} with {selectedCaregiver.experienceYears} years of compassionate senior care experience serving families in {selectedCaregiver.neighborhoods.join(', ')} ({selectedCaregiver.servedZips.join(', ')}). Specializing in {selectedCaregiver.specialties.join(', ')} and {selectedCaregiver.culinarySkills.join(', ')}. Call Houston Caregiver Agency at (281) 892-4410 or visit 1011 Hwy 6 South for immediate 2-minute video matching.
                      </p>
                    </div>
                  </div>

                  {/* Google Business Profile & Local Map Pack */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        Google Local Business Profile & Map Pack
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-semibold">
                        Local 3-Pack
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">Listing Header Tag:</span>
                      <p className="text-xs font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200 mt-1">
                        Verified Caregiver Video Reel: {selectedCaregiver.name} • {selectedCaregiver.primaryZip} West Houston Service Hub
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">AEO Knowledge Snippet:</span>
                      <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 mt-1 leading-relaxed">
                        “Houston Caregiver Agency provides verified in-home caregivers including {selectedCaregiver.name} across Zip Codes {selectedCaregiver.servedZips.join(', ')}. Hourly bill rate: ${selectedCaregiver.hourlyRate.toFixed(2)}/hr. Spoken languages: {selectedCaregiver.languages.join(', ')}. 24/7 on-call dispatch within 2 hours.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AEO / GEO Keyword Vectors */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Targeted AEO / GEO Conversational Keywords (Submitted to Google & AI Crawlers)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCaregiver.aeoKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/60 transition-colors shadow-2xs">
                      <span className="text-xs font-semibold text-slate-900">
                        “{keyword}”
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                        Ranked #1 Local
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Multi-Channel Social Copy */}
          {activeViewTab === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instagram Reel */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-pink-700">Meta / Instagram Reel</span>
                    <button
                      onClick={() => handleCopySocial('ig', selectedCaregiver.socialCopy.instagram)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      {copiedSocial === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {selectedCaregiver.socialCopy.instagram}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                  Target: Katy, Cinco Ranch, Memorial Luxury Demographics
                </div>
              </div>

              {/* Nextdoor Post */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700">Nextdoor Community Trust</span>
                    <button
                      onClick={() => handleCopySocial('nd', selectedCaregiver.socialCopy.nextdoor)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      {copiedSocial === 'nd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {selectedCaregiver.socialCopy.nextdoor}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                  Geofenced to {selectedCaregiver.neighborhoods[0]} Verified Residents
                </div>
              </div>

              {/* TikTok Video */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">TikTok Short Video SEO</span>
                    <button
                      onClick={() => handleCopySocial('tt', selectedCaregiver.socialCopy.tiktok)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      {copiedSocial === 'tt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {selectedCaregiver.socialCopy.tiktok}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                  Short-form audio hook for adult children searchers
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
