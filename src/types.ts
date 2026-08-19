export interface Caregiver {
  id: string;
  name: string;
  photoUrl: string;
  videoUrl?: string;
  videoDuration: string;
  title: string; // e.g. "Certified Dementia Care Specialist & CNA"
  experienceYears: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number; // e.g. $33.50
  primaryZip: string;
  servedZips: string[];
  neighborhoods: string[];
  languages: string[];
  specialties: string[];
  certifications: string[];
  culinarySkills: string[];
  bio: string;
  videoTranscript: string;
  jsonLdSchema: Record<string, any>;
  aeoKeywords: string[];
  socialCopy: {
    instagram: string;
    nextdoor: string;
    tiktok: string;
  };
  availability: 'Available Immediately' | 'Part-time Available' | '24/7 Live-In Available' | 'On Assignment';
  vaApproved: boolean;
  videoStatus: 'Uploaded' | 'Transcribing' | 'AEO/GEO Indexing' | 'Published & Search Indexed';
}

export interface VideoSubmission {
  id: string;
  caregiverName: string;
  submissionMethod: 'mobile_app' | 'email_in';
  emailFrom?: string;
  emailSubject?: string;
  videoFileName: string;
  fileSize: string;
  timestamp: string;
  languages: string[];
  competencies: string[];
  neighborhood: string;
  zipCode: string;
  rawNotes: string;
  status: 'queued' | 'transcribing' | 'optimizing_aeo' | 'indexed';
}

export interface AIMatchedCaregiver {
  caregiver: Caregiver;
  matchScore: number; // 0 - 100%
  matchReasons: string[];
  geoProximity: string;
  specialtyFit: string;
}

export interface AIRecommendationResponse {
  query: string;
  conversationalSummary: string;
  matchedCaregivers: AIMatchedCaregiver[];
  aeoExplanation: string;
  confidenceScore: number;
  matchedZipCode?: string;
}

export interface LeadInquiry {
  id: string;
  clientName: string;
  familyContact: string; // e.g. "Daughter (Linda)"
  phone: string;
  email: string;
  patientName: string;
  patientAge: number;
  zipCode: string;
  subdivision: string;
  careType: string;
  weeklyHoursNeeded: number;
  estimatedMonthlyValue: number; // calculated at $33.50/hr * hours * 4.33
  matchedCaregiverId: string;
  matchedCaregiverName: string;
  referralSource: string; // e.g. "TIRR Memorial Hermann (77433)", "ChatGPT Organic Search", "Nextdoor Cinco Ranch"
  status: 'New Inquiry' | '2-Min Video Dispatched' | 'Consultation Scheduled' | 'In-Home Assessment' | 'Active Contract';
  timestamp: string;
  notes: string;
  timeline: Array<{ time: string; event: string; type: 'sms' | 'email' | 'system' | 'call' }>;
}

export interface TerritoryCluster {
  id: string;
  name: string;
  keyZipCodes: string[];
  targetSubdivisions: string[];
  strategicCareFocus: string;
  activeCaregiversCount: number;
  clientCount: number;
  topHospitalReferral: string;
}

export interface ReferralPartner {
  id: string;
  name: string;
  category: 'Rehabilitation Hospital' | 'Health System & ACO' | 'Legal & Wealth Advisory';
  location: string;
  zipCode: string;
  leadVolumeMonthly: number;
  primaryCaregiverFocus: string;
}
