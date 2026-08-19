import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Calendar, 
  Star, 
  Languages, 
  Activity, 
  Sparkles,
  Share2
} from 'lucide-react';
import { Caregiver } from '../types';

interface VideoModalProps {
  caregiver: Caregiver | null;
  onClose: () => void;
  onBookCaregiver: (caregiver: Caregiver) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  caregiver,
  onClose,
  onBookCaregiver
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!caregiver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: 9:16 Video Player Simulation */}
        <div className="md:w-1/2 bg-slate-950 flex items-center justify-center p-4 min-h-[380px] md:min-h-[520px] relative">
          <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden relative shadow-2xl border-2 border-slate-800 flex flex-col justify-between p-3 text-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between z-20">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Houston Caregiver Agency</span>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Video Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={caregiver.photoUrl}
                alt={caregiver.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
            </div>

            {/* Center Play/Pause Button */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              {isPlaying && (
                <span className="mt-2 text-[10px] bg-black/70 px-2.5 py-0.5 rounded-full text-blue-200 font-medium">
                  Playing Reel • {caregiver.videoDuration}
                </span>
              )}
            </div>

            {/* Bottom Live Synchronized Captions */}
            <div className="relative z-20 space-y-2">
              <div className="bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-white/15 text-center shadow-lg">
                <p className="text-[11px] font-semibold text-amber-300 leading-tight">
                  “...caring for seniors across {caregiver.neighborhoods[0]} with dignity, safety, and specialized support...”
                </p>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  Whisper AI Synchronized Captions
                </span>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{caregiver.name}</span>
                  <span className="text-[10px] text-blue-300">{caregiver.neighborhoods[0]} ({caregiver.primaryZip})</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-full">
                  ${caregiver.hourlyRate}/hr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Caregiver Clinical Portfolio & Instant Booking */}
        <div className="md:w-1/2 p-6 bg-white text-slate-900 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-blue-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                  Verified Active Caregiver
                </span>
                {caregiver.vaApproved && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                    VA Aid & Attendance Approved
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{caregiver.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{caregiver.title}</p>
            </div>

            {/* Key Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 block font-medium">Experience & Rating:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {caregiver.rating} ({caregiver.experienceYears} Years Exp)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-medium">Standard Rate:</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">${caregiver.hourlyRate.toFixed(2)} / hr</span>
              </div>
            </div>

            {/* Spoken Languages & Neighborhoods */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Languages className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 font-medium">Languages Spoken: </span>
                  <span className="text-slate-900 font-semibold">{caregiver.languages.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 font-medium">West Houston Coverage: </span>
                  <span className="text-slate-900 font-semibold">
                    {caregiver.neighborhoods.join(', ')} (Zips: {caregiver.servedZips.join(', ')})
                  </span>
                </div>
              </div>
            </div>

            {/* Clinical Competencies */}
            <div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">
                Specialized Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {caregiver.specialties.map((spec, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200/80 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Culinary */}
            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">Culinary & Nutrition: </strong>
              {caregiver.culinarySkills.join(', ')}
            </div>
          </div>

          {/* Booking Action */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                onBookCaregiver(caregiver);
                onClose();
              }}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Home Assessment with {caregiver.name.split(',')[0]}</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Houston Caregiver Agency • 24 Assigned West Houston Zip Codes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
