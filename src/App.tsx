import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PitchBanner } from './components/PitchBanner';
import { StageIntake } from './components/StageIntake';
import { StageVideoProcessing } from './components/StageVideoProcessing';
import { StageAIRecommendation } from './components/StageAIRecommendation';
import { StageCRMLeads } from './components/StageCRMLeads';
import { StageTerritoryROI } from './components/StageTerritoryROI';
import { StageLeadGen } from './components/StageLeadGen';
import { LeadGenModal } from './components/LeadGenModal';
import { VideoModal } from './components/VideoModal';
import { DemoTourModal } from './components/DemoTourModal';
import { INITIAL_CAREGIVERS, INITIAL_LEADS } from './data/mockData';
import { Caregiver, LeadInquiry } from './types';
import confetti from 'canvas-confetti';
import { ShieldCheck, MapPin, Sparkles, PhoneCall } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('intake');
  const [caregivers, setCaregivers] = useState<Caregiver[]>(INITIAL_CAREGIVERS);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver>(INITIAL_CAREGIVERS[0]);
  const [leads, setLeads] = useState<LeadInquiry[]>(INITIAL_LEADS);
  const [videoModalCaregiver, setVideoModalCaregiver] = useState<Caregiver | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isLeadGenOpen, setIsLeadGenOpen] = useState(false);
  const [isProcessingIntake, setIsProcessingIntake] = useState(false);
  const [isSimulatingEndToEnd, setIsSimulatingEndToEnd] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handler: Process Caregiver Video Intake
  const handleProcessCaregiver = async (caregiverData: Partial<Caregiver>, source: 'mobile' | 'email') => {
    setIsProcessingIntake(true);
    showToast(`Transcribing audio & generating JSON-LD Schema for ${caregiverData.name || 'Caregiver'}...`);

    try {
      const response = await fetch('/api/ai/process-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: caregiverData.name,
          primaryZip: caregiverData.primaryZip,
          neighborhoods: caregiverData.neighborhoods,
          languages: caregiverData.languages,
          specialties: caregiverData.specialties,
          hourlyRate: caregiverData.hourlyRate,
          rawTranscript: caregiverData.videoTranscript
        })
      });

      const aiProcessed = await response.json();

      const newCaregiver: Caregiver = {
        id: 'cg-' + Date.now(),
        name: caregiverData.name || 'Maria Gonzalez, CNA',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
        videoDuration: aiProcessed.videoDuration || '0:38',
        title: caregiverData.title || 'Certified Senior Care Specialist',
        experienceYears: caregiverData.experienceYears || 9,
        rating: 4.98,
        reviewCount: 34,
        hourlyRate: caregiverData.hourlyRate || 34.0,
        primaryZip: caregiverData.primaryZip || '77494',
        servedZips: caregiverData.servedZips || [caregiverData.primaryZip || '77494', '77450', '77077'],
        neighborhoods: caregiverData.neighborhoods || ['Cinco Ranch & West Houston'],
        languages: caregiverData.languages || ['Spanish (Native)', 'English (Fluent)'],
        specialties: caregiverData.specialties || ['Gentle Dementia Care', 'Fall Prevention'],
        certifications: ['Certified Nursing Assistant (CNA)', 'CPR & First Aid'],
        culinarySkills: caregiverData.culinarySkills || ['Diabetic Latin Cuisine'],
        bio: `${caregiverData.name} provides dedicated senior care across West Houston.`,
        videoTranscript: aiProcessed.polishedTranscript || caregiverData.videoTranscript || '',
        jsonLdSchema: aiProcessed.jsonLdSchema || {},
        aeoKeywords: aiProcessed.aeoKeywords || [`${caregiverData.name} caregiver Houston`],
        socialCopy: aiProcessed.socialCopy || {
          instagram: `Meet ${caregiverData.name}! 🌟 Compassionate care in West Houston. #HoustonCaregiverAgency`,
          nextdoor: `Neighbors in ${caregiverData.neighborhoods?.[0] || 'West Houston'}: Meet caregiver ${caregiverData.name}.`,
          tiktok: `Best senior care in Houston TX with ${caregiverData.name}. #Caregiver`
        },
        availability: 'Available Immediately',
        vaApproved: !!caregiverData.vaApproved,
        videoStatus: 'Published & Search Indexed'
      };

      setCaregivers([newCaregiver, ...caregivers]);
      setSelectedCaregiver(newCaregiver);
      setActiveTab('video-ai');
      showToast(`Success! ${newCaregiver.name} is now search-indexed with JSON-LD Schema.`);
    } catch (error) {
      console.error('Error processing caregiver:', error);
      showToast('Error processing video. Using instant optimized profile.');
      setActiveTab('video-ai');
    } finally {
      setIsProcessingIntake(false);
    }
  };

  // Handler: Request Lead Match Dispatch
  const handleRequestLeadDispatch = async (caregiver: Caregiver, promptContext: string) => {
    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: 'Arthur & Linda Sterling',
          familyContact: 'Daughter: Linda Sterling',
          phone: '(281) 892-4410',
          email: 'linda.sterling@katylaw.com',
          patientName: 'Evelyn Sterling',
          patientAge: 84,
          zipCode: caregiver.primaryZip,
          subdivision: caregiver.neighborhoods[0] || 'Cinco Ranch',
          careType: caregiver.specialties[0] || 'Dementia Care',
          weeklyHoursNeeded: 35,
          matchedCaregiverId: caregiver.id,
          matchedCaregiverName: caregiver.name,
          referralSource: 'AI Search Recommendation (JSON-LD Indexed)',
          notes: `Family searched: "${promptContext}". 2-Minute video introduction dispatched automatically.`
        })
      });

      const data = await response.json();
      if (data.lead) {
        setLeads([data.lead, ...leads]);
        setActiveTab('crm');
        showToast(`2-Minute SMS with ${caregiver.name}'s video reel dispatched to family phone!`);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
    }
  };

  // Handler: Advance Lead Status
  const handleAdvanceLeadStatus = (leadId: string, newStatus: LeadInquiry['status']) => {
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status: newStatus,
          timeline: [
            { time: 'Just now', event: `Status updated to ${newStatus}`, type: 'system' },
            ...l.timeline
          ]
        };
      }
      return l;
    }));
    showToast(`Lead updated to: ${newStatus}`);
  };

  // Handler: Simulate or Add a Brand New Inbound Lead
  const handleAddNewLead = (customLead?: any) => {
    if (customLead && customLead.name) {
      const formattedLead: LeadInquiry = {
        id: customLead.id || 'lead-' + Date.now(),
        clientName: customLead.name || 'Agency Lead Inquiry',
        familyContact: customLead.name || 'Director Contact',
        phone: customLead.phone || '(281) 892-4410',
        email: customLead.email || 'director@houstoncaregiveragency.com',
        patientName: customLead.googleBusinessPage ? 'Google Business Lead' : 'Care Recipient',
        patientAge: 82,
        zipCode: '77494',
        subdivision: customLead.targetTerritory || 'West Houston 24 Zip Codes',
        careType: `Agency Growth Roster (~${customLead.employeeCount || '40 Caregivers'})`,
        weeklyHoursNeeded: 35,
        estimatedMonthlyValue: 35 * 33.50 * 4.33,
        matchedCaregiverId: caregivers[0].id,
        matchedCaregiverName: caregivers[0].name,
        referralSource: `Agency Lead Gen Form (${customLead.budget || 'Enterprise'})`,
        status: '2-Min Video Dispatched',
        timestamp: 'Just now',
        notes: `Google Business Profile: ${customLead.googleBusinessPage || 'Verified'}. Website: ${customLead.website || 'N/A'}. Budget: ${customLead.budget || '$2,500-$5,000/mo'}.`,
        timeline: [
          { time: 'Just now', event: 'Agency qualification form submitted with Google Business link', type: 'system' },
          { time: 'Just now', event: `Custom AI Growth Audit generated & dispatched to ${customLead.email || 'director'}`, type: 'sms' }
        ]
      };
      setLeads([formattedLead, ...leads]);
      return;
    }

    const randomZips = ['77494', '77077', '77433', '77041', '77008'];
    const randomSubs = ['Cinco Ranch West', 'Lakes of Parkway', 'Bridgeland', 'Lakes on Eldridge', 'Houston Heights'];
    const names = ['Col. Robert Harrison', 'Victoria Belmont', 'Dr. Harold Vance', 'Eleanor & Frank Davis'];
    const randomIdx = Math.floor(Math.random() * randomSubs.length);

    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      clientName: names[randomIdx % names.length],
      familyContact: 'Adult Child Contact',
      phone: `(281) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`,
      email: 'family.inquiry@gmail.com',
      patientName: 'Parent',
      patientAge: 82 + Math.floor(Math.random() * 8),
      zipCode: randomZips[randomIdx],
      subdivision: randomSubs[randomIdx],
      careType: 'Private-Pay Specialized Senior Care',
      weeklyHoursNeeded: 35,
      estimatedMonthlyValue: 35 * 33.50 * 4.33,
      matchedCaregiverId: caregivers[randomIdx % caregivers.length].id,
      matchedCaregiverName: caregivers[randomIdx % caregivers.length].name,
      referralSource: 'TIRR Memorial Hermann / AI Referral Portal',
      status: '2-Min Video Dispatched',
      timestamp: 'Just now',
      notes: 'Urgent inquiry parsed by 2-Minute Lead Concierge. Caregiver video reel link dispatched via SMS.',
      timeline: [
        { time: 'Just now', event: 'Web inquiry parsed from hospital discharge planner', type: 'system' },
        { time: 'Just now', event: '2-Minute Video Concierge dispatched SMS to family', type: 'sms' }
      ]
    };

    setLeads([newLead, ...leads]);
    showToast('New $5,000/mo high-hour lead simulated & added to CRM!');
  };

  // Handler: One-Click 30s End-to-End Sales Pitch Simulation
  const handleFastSimulation = () => {
    setIsSimulatingEndToEnd(true);
    showToast('Step 1: Simulating Caregiver Mobile Video Intake...');
    setActiveTab('intake');

    setTimeout(() => {
      showToast('Step 2: Whisper AI Transcribing & Generating JSON-LD Schema...');
      setActiveTab('video-ai');
    }, 4500);

    setTimeout(() => {
      showToast('Step 3: Family searches ChatGPT/Gemini -> AI Recommends Houston Caregiver Agency...');
      setActiveTab('ai-search');
    }, 9000);

    setTimeout(() => {
      showToast('Step 4: Automated 2-Minute Video Dispatched -> Lead Captured in CRM!');
      setActiveTab('crm');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 14000);

    setTimeout(() => {
      showToast('Step 5: Showing 24 Zip Codes & 1-Client Payback Model...');
      setActiveTab('territory-roi');
      setIsSimulatingEndToEnd(false);
    }, 19000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTour={() => setIsTourOpen(true)}
        onRunFastSimulation={handleFastSimulation}
        onOpenLeadGen={() => setIsLeadGenOpen(true)}
        isSimulating={isSimulatingEndToEnd}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Executive Banner */}
        <PitchBanner
          onOpenTour={() => setIsTourOpen(true)}
          onNavigateToROI={() => setActiveTab('territory-roi')}
          onOpenLeadGen={() => setIsLeadGenOpen(true)}
        />

        {/* Tab Stages */}
        {activeTab === 'intake' && (
          <StageIntake
            onProcessCaregiver={handleProcessCaregiver}
            caregivers={caregivers}
            onSelectExistingCaregiver={(cg) => {
              setSelectedCaregiver(cg);
              setActiveTab('video-ai');
            }}
            isProcessing={isProcessingIntake}
          />
        )}

        {activeTab === 'video-ai' && (
          <StageVideoProcessing
            caregivers={caregivers}
            selectedCaregiver={selectedCaregiver}
            onSelectCaregiver={(cg) => setSelectedCaregiver(cg)}
            onProceedToAISearch={() => setActiveTab('ai-search')}
          />
        )}

        {activeTab === 'ai-search' && (
          <StageAIRecommendation
            caregivers={caregivers}
            onOpenVideoModal={(cg) => setVideoModalCaregiver(cg)}
            onRequestLeadDispatch={handleRequestLeadDispatch}
          />
        )}

        {activeTab === 'crm' && (
          <StageCRMLeads
            leads={leads}
            caregivers={caregivers}
            onAdvanceLeadStatus={handleAdvanceLeadStatus}
            onAddNewLead={handleAddNewLead}
            onOpenVideoModal={(cg) => setVideoModalCaregiver(cg)}
          />
        )}

        {activeTab === 'territory-roi' && (
          <StageTerritoryROI onOpenLeadGen={() => setIsLeadGenOpen(true)} />
        )}

        {activeTab === 'lead-gen' && (
          <StageLeadGen
            onLeadCaptured={(lead) => {
              showToast(`Agency Lead Captured: ${lead?.name || 'Growth Profile'} logged to CRM`);
              handleAddNewLead(lead);
            }}
            onNavigateToDemo={() => setActiveTab('intake')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-600 py-6 border-t border-slate-200/90 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              H
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Houston Caregiver Agency</span>
            <span className="text-slate-400 hidden md:inline">• Video-First Local AEO & Care Matching Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
            <button
              onClick={() => setIsLeadGenOpen(true)}
              className="text-blue-700 hover:text-blue-800 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Agency Growth Lead Gen Form
            </button>
            <span>•</span>
            <span>24 Assigned Zip Codes</span>
            <span>•</span>
            <span>$32-$35/hr Weighted Avg $33.50/hr</span>
            <span>•</span>
            <span>VA-Approved Provider</span>
          </div>
        </div>
      </footer>

      {/* Lead Gen Modal */}
      <LeadGenModal
        isOpen={isLeadGenOpen}
        onClose={() => setIsLeadGenOpen(false)}
        onLeadSubmitted={(lead) => {
          showToast(`Agency Growth Plan generated for ${lead?.name || 'Director'}`);
        }}
      />

      {/* Video Modal */}
      <VideoModal
        caregiver={videoModalCaregiver}
        onClose={() => setVideoModalCaregiver(null)}
        onBookCaregiver={(cg) => {
          handleRequestLeadDispatch(cg, 'Direct Video Reel Booking');
        }}
      />

      {/* Sales Pitch Demo Tour Modal */}
      <DemoTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onJumpToStage={(stageId) => setActiveTab(stageId)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 text-xs font-semibold animate-slide-up max-w-md">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
