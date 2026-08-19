import React, { useState } from 'react';
import { 
  Smartphone, 
  Mail, 
  UploadCloud, 
  Video, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Languages, 
  Utensils, 
  Activity, 
  ArrowRight,
  RefreshCw,
  FileVideo,
  Play,
  Users,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';
import { Caregiver } from '../types';

interface StageIntakeProps {
  onProcessCaregiver: (caregiverData: Partial<Caregiver>, source: 'mobile' | 'email') => void;
  caregivers: Caregiver[];
  onSelectExistingCaregiver: (caregiver: Caregiver) => void;
  isProcessing: boolean;
}

interface QueuedCreatorVideo {
  id: string;
  creatorName: string;
  avatar: string;
  zipCode: string;
  neighborhood: string;
  method: 'mobile_app' | 'email_in';
  videoFileName: string;
  fileSize: string;
  uploadTime: string;
  specialties: string[];
  status: 'queued' | 'transcribing' | 'indexing' | 'ready';
  progress: number;
}

export const StageIntake: React.FC<StageIntakeProps> = ({
  onProcessCaregiver,
  caregivers,
  onSelectExistingCaregiver,
  isProcessing
}) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'email' | 'batch'>('mobile');

  // Form State
  const [name, setName] = useState('Maria Gonzalez, CNA');
  const [phone, setPhone] = useState('(281) 772-8819');
  const [primaryZip, setPrimaryZip] = useState('77494');
  const [neighborhood, setNeighborhood] = useState('Cinco Ranch & Katy');
  const [languages, setLanguages] = useState<string[]>(['Spanish (Native)', 'English (Fluent)']);
  const [specialties, setSpecialties] = useState<string[]>([
    'Gentle Dementia Care', 
    'Fall Prevention & Gait Belt', 
    'Post-Stroke Mobility'
  ]);
  const [culinarySkills, setCulinarySkills] = useState('Diabetic Latin Cuisine & Low-Sodium Meal Prep');
  const [hourlyRate, setHourlyRate] = useState(34.0);
  const [rawNotes, setRawNotes] = useState(
    '“Hi! I am Maria Gonzalez, CNA. I have 9 years of dementia and memory care experience in Cinco Ranch. I speak Spanish and English and treat every senior with deep dignity and patience.”'
  );
  const [uploadedFileName, setUploadedFileName] = useState('maria_gonzalez_38s_intro.mp4');

  // Email form state
  const [emailSender, setEmailSender] = useState('david.oconnor.care@gmail.com');
  const [emailSubject, setEmailSubject] = useState('Video Profile Intake - David O\'Connor (Cypress 77433)');
  const [emailBody, setEmailBody] = useState(
    'Attached is my 42-second intro video for TIRR post-rehab discharges and VA Aid & Attendance in Bridgeland/Towne Lake 77433. HHA certified, physical therapy aide, 12 years experience.'
  );

  // Batch Multi-Creator Queue State
  const [queuedBatch, setQueuedBatch] = useState<QueuedCreatorVideo[]>([
    {
      id: 'q-1',
      creatorName: 'Maria Gonzalez, CNA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      zipCode: '77494',
      neighborhood: 'Cinco Ranch',
      method: 'mobile_app',
      videoFileName: 'maria_cinco_ranch_dementia_38s.mp4',
      fileSize: '24.8 MB',
      uploadTime: '10:42 AM',
      specialties: ['Dementia Care', 'Spanish Bilingual'],
      status: 'ready',
      progress: 100
    },
    {
      id: 'q-2',
      creatorName: 'David O\'Connor, HHA',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
      zipCode: '77433',
      neighborhood: 'Bridgeland & Cypress',
      method: 'email_in',
      videoFileName: 'david_cypress_va_rehab_42s.mov',
      fileSize: '31.2 MB',
      uploadTime: '10:44 AM',
      specialties: ['VA Aid & Attendance', 'TIRR Post-Stroke'],
      status: 'indexing',
      progress: 78
    },
    {
      id: 'q-3',
      creatorName: 'Sarah Jenkins, CNA',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      zipCode: '77079',
      neighborhood: 'Memorial Villages',
      method: 'mobile_app',
      videoFileName: 'sarah_memorial_parkinsons_45s.mp4',
      fileSize: '28.4 MB',
      uploadTime: '10:46 AM',
      specialties: ['Parkinson’s Protocols', 'Gait-Belt Safety'],
      status: 'transcribing',
      progress: 45
    },
    {
      id: 'q-4',
      creatorName: 'Linh Nguyen, LVN',
      avatar: 'https://images.unsplash.com/photo-1594824813629-4113cb602fa9?w=500&auto=format&fit=crop&q=80',
      zipCode: '77055',
      neighborhood: 'Spring Branch',
      method: 'email_in',
      videoFileName: 'linh_spring_branch_vitals_35s.mp4',
      fileSize: '22.1 MB',
      uploadTime: '10:48 AM',
      specialties: ['Cardiac Vitals', 'Vietnamese Bilingual'],
      status: 'queued',
      progress: 15
    }
  ]);

  const [batchConfirmation, setBatchConfirmation] = useState<{
    show: boolean;
    batchId: string;
    count: number;
    timestamp: string;
  } | null>(null);

  const availableLanguages = ['English (Fluent)', 'Spanish (Native)', 'Tagalog (Fluent)', 'Vietnamese (Native)', 'French', 'Russian (Native)'];
  const availableSpecialties = [
    'Gentle Dementia Care',
    'Fall Prevention & Gait Belt',
    'Post-Stroke Mobility',
    'VA Aid & Attendance Expert',
    'Parkinson’s Disease Protocols',
    '24-Hour Live-In Supervision',
    'Post-Surgical Outpatient Recovery',
    'Cardiac & CHF Vital Monitoring'
  ];

  const handleLanguageToggle = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter(l => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleSpecialtyToggle = (spec: string) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter(s => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };

  const handlePresetSelect = (cg: Caregiver) => {
    setName(cg.name);
    setPrimaryZip(cg.primaryZip);
    setNeighborhood(cg.neighborhoods.join(', '));
    setLanguages(cg.languages);
    setSpecialties(cg.specialties);
    setCulinarySkills(cg.culinarySkills.join(', '));
    setHourlyRate(cg.hourlyRate);
    setRawNotes(cg.videoTranscript);
    setUploadedFileName(`${cg.name.toLowerCase().replace(/[^a-z]/g, '_')}_intro.mp4`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcessCaregiver(
      {
        name,
        primaryZip,
        neighborhoods: [neighborhood],
        servedZips: [primaryZip, '77450', '77077'],
        languages,
        specialties,
        culinarySkills: [culinarySkills],
        hourlyRate,
        videoTranscript: rawNotes,
        title: specialties[0] ? `${specialties[0]} Specialist` : 'Certified Caregiver',
        experienceYears: 8,
        rating: 4.95,
        reviewCount: 28,
        availability: 'Available Immediately',
        vaApproved: specialties.includes('VA Aid & Attendance Expert')
      },
      activeTab === 'email' ? 'email' : 'mobile'
    );
  };

  // Simulate Bulk Intake Upload from Multiple Caregivers
  const handleSimulateMultiCreatorBatch = () => {
    const newBatchId = 'BATCH-' + Math.floor(100000 + Math.random() * 900000);
    setBatchConfirmation({
      show: true,
      batchId: newBatchId,
      count: 4,
      timestamp: new Date().toLocaleTimeString()
    });

    // Advance queue progress
    let p = 20;
    const interval = setInterval(() => {
      p += 25;
      setQueuedBatch(prev => prev.map(item => ({
        ...item,
        progress: Math.min(100, item.progress + 20),
        status: item.progress >= 80 ? 'ready' : item.progress >= 50 ? 'indexing' : 'transcribing'
      })));
      if (p >= 100) {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-tighter bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded uppercase">
              1. Multi-Creator Ingest Pipeline
            </span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold font-mono tracking-tighter uppercase">
              SMARTPHONE & EMAIL GATEWAY
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mt-1">
            Autonomous Caregiver Video & Multi-Creator Intake
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Caregivers capture quick 30-second smartphone videos or email them to <code className="text-indigo-600 font-mono font-bold">videos@houstoncaregivers.ai</code>.
            The pipeline queues, transcribes with Whisper AI, and prepares micro-targeted local search schema.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'mobile'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <span>Mobile App</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Email Gateway</span>
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'batch'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Multi-Creator Queue</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Loaders for Live Sales Demo */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800">
              Demo Presets: Select a West Houston Caregiver Profile to Test
            </span>
          </div>
          <span className="text-[11px] text-indigo-600 font-medium">
            Click any profile to pre-fill the employee intake form
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {caregivers.slice(0, 4).map((cg) => (
            <button
              key={cg.id}
              onClick={() => handlePresetSelect(cg)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all text-left group cursor-pointer"
            >
              <img
                src={cg.photoUrl}
                alt={cg.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200 group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600">
                  {cg.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {cg.primaryZip} • {cg.neighborhoods[0]}
                </p>
                <p className="text-[10px] text-green-700 font-semibold font-mono truncate">
                  {cg.languages[0]} • ${cg.hourlyRate}/hr
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Intake Workspace */}
      {activeTab === 'batch' ? (
        /* MULTI-CREATOR BATCH INGESTION QUEUE VIEW */
        <div className="space-y-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Multi-Creator Video Ingestion & Processing Queue
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulating simultaneous video submissions from caregivers across Houston (Cinco Ranch, Cypress, Memorial, Spring Branch).
              </p>
            </div>

            <button
              onClick={handleSimulateMultiCreatorBatch}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Simulate Multi-Creator Ingest Batch</span>
            </button>
          </div>

          {/* Batch Confirmation Notification */}
          {batchConfirmation && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-3 animate-slide-up">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">
                    Batch Confirmation: {batchConfirmation.count} Videos Queued for Processing
                  </h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 font-mono">
                    Batch ID: #{batchConfirmation.batchId} • Received at {batchConfirmation.timestamp} • Pipeline: Ingestion &rarr; Whisper AI &rarr; JSON-LD
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    All creator video assets verified, 9:16 vertical formatted, and queued for AEO local search index generation.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold uppercase">
                Queued
              </span>
            </div>
          )}

          {/* Queue List */}
          <div className="space-y-3">
            {queuedBatch.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.avatar}
                    alt={item.creatorName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{item.creatorName}</h4>
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 font-mono px-2 py-0.2 rounded font-semibold">
                        {item.zipCode} • {item.neighborhood}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate flex items-center gap-1.5 font-mono">
                      <FileVideo className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{item.videoFileName} ({item.fileSize})</span>
                      <span>•</span>
                      <span>Via {item.method === 'mobile_app' ? 'Mobile App Portal' : 'Email Gateway'}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.specialties.map((spec, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.2 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:w-56 shrink-0 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-500 uppercase text-[10px] font-bold">
                      {item.status === 'ready' && '✅ Search Indexed'}
                      {item.status === 'indexing' && '⚙️ Generating Schema'}
                      {item.status === 'transcribing' && '🎙️ Whisper AI Diarizing'}
                      {item.status === 'queued' && '⏳ In Queue'}
                    </span>
                    <span className="font-mono font-bold text-indigo-600">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        item.progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono text-right">
                    Received {item.uploadTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE CREATOR WORKSPACE (MOBILE APP OR EMAIL GATEWAY) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Intake Simulation Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            {activeTab === 'mobile' ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Mobile Smartphone Caregiver Profiling
                      </h3>
                      <p className="text-xs text-slate-500">
                        Distributed via SMS/Link to active roster of ~40 caregivers
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    Est. Time: 2 Minutes
                  </span>
                </div>

                {/* Basic Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Caregiver Full Name & Title
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Maria Gonzalez, CNA"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Caregiver Mobile Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Service Zip Code (West Houston)
                    </label>
                    <input
                      type="text"
                      value={primaryZip}
                      onChange={(e) => setPrimaryZip(e.target.value)}
                      required
                      className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="77494, 77077, 77433, 77041, 77008"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Micro-Communities & Subdivisions
                    </label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      required
                      className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Cinco Ranch, Lakes of Parkway, Bridgeland"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Spoken Languages (Crucial for Houston Family Compatibility)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableLanguages.map((lang) => {
                      const isSelected = languages.includes(lang);
                      return (
                        <button
                          type="button"
                          key={lang}
                          onClick={() => handleLanguageToggle(lang)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clinical Competencies */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Clinical Competencies & Specialized Certifications</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSpecialties.map((spec) => {
                      const isSelected = specialties.includes(spec);
                      return (
                        <button
                          type="button"
                          key={spec}
                          onClick={() => handleSpecialtyToggle(spec)}
                          className={`text-left text-xs p-2 rounded-lg font-medium border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-semibold'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{spec}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Culinary Skills & Hourly Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Specialized Culinary / Diet Capability</span>
                    </label>
                    <input
                      type="text"
                      value={culinarySkills}
                      onChange={(e) => setCulinarySkills(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Diabetic Latin, Mediterranean, Low-Sodium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Standard Bill Rate ($32.00 – $35.00 / hr)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="32.0"
                        max="35.0"
                        step="0.5"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
                        className="flex-1 accent-indigo-600"
                      />
                      <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono">
                        ${hourlyRate.toFixed(2)} / hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Reel Upload Zone */}
                <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50/40">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <FileVideo className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        Attached Caregiver Intro Video: {uploadedFileName}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Format: 9:16 Vertical Reel • Size: 24.8 MB • Audio: 48kHz Stereo
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Simulating smartphone camera recording / gallery upload')}
                      className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-2xs cursor-pointer"
                    >
                      Change Video
                    </button>
                  </div>

                  <div className="mt-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Raw Audio Notes / Video Transcript:
                    </label>
                    <textarea
                      rows={2}
                      value={rawNotes}
                      onChange={(e) => setRawNotes(e.target.value)}
                      className="w-full text-xs font-normal p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Submit Trigger */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isProcessing 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Whisper Transcription & Schema Indexing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                      <span>Submit & Run AI Video & AEO/GEO Processing Pipeline</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Email-In Simulation */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Email-In Video Gateway Simulator
                      </h3>
                      <p className="text-xs text-slate-500">
                        Autonomous ingestion inbox: <code className="text-indigo-600 font-semibold font-mono">videos@houstoncaregivers.ai</code>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md font-mono">
                    Zero Webhook Drag
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500">From: </span>
                    <input
                      type="text"
                      value={emailSender}
                      onChange={(e) => setEmailSender(e.target.value)}
                      className="w-full sm:w-auto font-sans font-medium px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500">Subject: </span>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full font-sans font-medium px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Body Text:</span>
                    <textarea
                      rows={3}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full font-sans font-normal p-2 bg-white border border-slate-300 rounded text-slate-900 text-xs"
                    />
                  </div>
                  <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded flex items-center justify-between font-sans">
                    <div className="flex items-center gap-2">
                      <FileVideo className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-semibold text-indigo-900">
                        david_oconnor_cypress_va_rehab_42s.mov (31.2 MB)
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded font-mono">
                      Virus Scanned & Validated
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simulate Automated Email Ingestion & Process Video</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Mobile Device Live Simulation Mockup */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[280px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 relative">
              {/* Phone Speaker Notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-950"></div>
              </div>

              {/* Screen Content */}
              <div className="bg-slate-950 rounded-[28px] overflow-hidden text-white p-3 space-y-3 aspect-[9/16] flex flex-col justify-between relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>9:41 AM</span>
                    <span className="text-emerald-400 font-bold">5G • 100%</span>
                  </div>

                  <div className="text-center py-1">
                    <div className="text-[11px] font-bold text-indigo-400">Houston Caregiver Agency</div>
                    <div className="text-[9px] text-slate-400">Caregiver Video Intake Portal</div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[9/12] bg-slate-800 border border-slate-700">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                      alt="Caregiver Selfie"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded w-fit flex items-center gap-1 mb-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        REC 0:38
                      </span>
                      <p className="text-xs font-bold text-white">{name}</p>
                      <p className="text-[10px] text-indigo-300">{neighborhood} ({primaryZip})</p>
                      <p className="text-[9px] text-slate-300">{languages.join(' • ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800 text-[10px] space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Rate: <strong className="text-white font-mono">${hourlyRate}/hr</strong></span>
                    <span>Skills: <strong className="text-emerald-400">{specialties.length} Tagged</strong></span>
                  </div>
                  <div className="text-[9px] text-slate-500 truncate font-mono">
                    Ready to auto-sync with AEO/GEO search engine
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium text-center mt-3 font-mono">
              Simulated Onboarding Screen on Employee Smartphone
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
