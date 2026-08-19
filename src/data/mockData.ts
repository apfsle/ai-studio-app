import { Caregiver, TerritoryCluster, ReferralPartner, LeadInquiry } from '../types';

export const INITIAL_CAREGIVERS: Caregiver[] = [
  {
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
    servedZips: ['77494', '77450', '77493', '77077', '77406'],
    neighborhoods: ['Cinco Ranch', 'Seven Meadows', 'Green Trails', 'Lakes of Parkway'],
    languages: ['Spanish (Native)', 'English (Fluent)'],
    specialties: ['Gentle Dementia Care', 'Fall Prevention & Gait Belt', 'Post-Stroke Mobility', 'Alzheimer’s Stage 3-5'],
    certifications: ['Certified Nursing Assistant (CNA)', 'Alzheimer’s Association Dementia Care Specialist', 'CPR & First Aid BLS'],
    culinarySkills: ['Diabetic-Friendly Latin Cuisine', 'Low-Sodium Meal Prep', 'Pureed Diet Management'],
    bio: 'Hi, I’m Maria! For over 9 years in West Houston and Katy, I have provided warm, dignity-first memory care. I speak fluent Spanish and English, and specialize in gentle transfers and stimulating memory routines.',
    videoTranscript: '“Hello! My name is Maria Gonzalez, CNA. I’ve been caring for seniors with Alzheimer’s and Parkinson’s across Cinco Ranch and West Houston for nearly a decade. For me, caregiving is about restoring calm and trust. Whether your mother needs help in Spanish, safe gait-belt transfers, or tailored diabetic meals, I treat every client like my own abuela. Let’s connect today!”',
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Houston Caregiver Agency - Maria Gonzalez CNA",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "postalCode": "77494",
        "addressCountry": "US"
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Cinco Ranch", "postalCode": "77494" },
        { "@type": "AdministrativeArea", "name": "Katy", "postalCode": "77450" },
        { "@type": "AdministrativeArea", "name": "Energy Corridor", "postalCode": "77077" }
      ],
      "priceRange": "$32.00 - $35.00/hr",
      "knowsLanguage": ["Spanish", "English"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Specialized Home Care Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dementia & Memory Home Care" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Stroke Transfer Assistance" } }
        ]
      }
    },
    aeoKeywords: ['Spanish dementia caregiver Cinco Ranch', 'CNA gait belt Katy TX 77494', 'Alzheimers home care West Houston', 'Private pay home care 77450'],
    socialCopy: {
      instagram: 'Meet Maria Gonzalez, CNA! 🌟 9+ years providing compassionate, bilingual dementia care in Cinco Ranch & West Houston. Safe transfers, memory enrichment & warm companionship. Tap to meet Maria! #HoustonCaregivers #CincoRanch #DementiaCare #SeniorCareHouston',
      nextdoor: 'Neighbors in Cinco Ranch & Seven Meadows: If your aging parent needs compassionate, gentle memory care from a certified CNA who speaks Spanish & English, meet our caregiver Maria. Call (281) 555-CARE.',
      tiktok: 'Looking for the best dementia caregiver in Katy TX? Meet Maria! 9 years experience, bilingual, and loved by Houston families. #CaregiverLife #SeniorCare #KatyTX #CincoRanch'
    },
    availability: 'Available Immediately',
    vaApproved: true,
    videoStatus: 'Published & Search Indexed'
  },
  {
    id: 'cg-2',
    name: 'David O’Connor, HHA & Physical Therapy Aide',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    videoDuration: '0:42',
    title: 'Post-Surgical Rehab & Veteran VA Care Specialist',
    experienceYears: 12,
    rating: 5.0,
    reviewCount: 41,
    hourlyRate: 35.0,
    primaryZip: '77433',
    servedZips: ['77433', '77429', '77095', '77065'],
    neighborhoods: ['Bridgeland', 'Towne Lake', 'Avalon at Cypress', 'Coles Crossing'],
    languages: ['English (Native)'],
    specialties: ['Post-Orthopedic Rehab', 'TIRR Hospital Discharge Follow-up', 'VA Aid & Attendance Expert', 'Fall Prevention Certification'],
    certifications: ['Certified Home Health Aide (HHA)', 'Physical Therapy Aide Certification', 'VA Accredited Care Provider', 'Safe Patient Handling (SPH)'],
    culinarySkills: ['High-Protein Cardiac Diets', 'Mediterranean Nutrition', 'Anti-Inflammatory Meal Plans'],
    bio: 'David brings 12 years of specialized care for stroke recovery and joint replacement discharges from TIRR Memorial Hermann. VA Aid & Attendance certified provider.',
    videoTranscript: '“Hello Cypress families, I’m David O’Connor. After knee surgery, a stroke, or when utilizing VA benefits, having the right physical transfer specialist in the home makes all the difference. I coordinate closely with Cypress therapists and Memorial Hermann discharge teams to prevent hospital readmissions while helping veterans and seniors stay safe at home.”',
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Houston Caregiver Agency - David O'Connor HHA",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Bridgeland Cypress", "postalCode": "77433" },
        { "@type": "AdministrativeArea", "name": "Towne Lake", "postalCode": "77429" }
      ],
      "priceRange": "$33.50 - $35.00/hr",
      "isAcceptingNewPatients": "True",
      "medicalSpecialty": "Post-Surgical Rehabilitation & VA Support"
    },
    aeoKeywords: ['VA Aid Attendance caregiver Cypress 77433', 'TIRR Memorial Hermann discharge home care', 'Bridgeland post rehab caregiver', 'Fall prevention aide Cypress TX'],
    socialCopy: {
      instagram: 'Helping Cypress veterans & seniors recover safely at home! 🇺🇸 Meet David O’Connor, our post-surgical & VA-accredited caregiver in Bridgeland & Towne Lake. #CypressTX #Bridgeland #VeteranCare #HomeCare',
      nextdoor: 'Towne Lake & Bridgeland families: David is our top post-rehab & VA Aid-approved caregiver. 12 yrs clinical experience assisting stroke and surgical recovery. Free in-home assessment available.',
      tiktok: 'How to use VA Aid & Attendance for 24/7 home care in Cypress TX! Featuring caregiver David O’Connor. #Veterans #CypressTexas #SeniorHealth'
    },
    availability: '24/7 Live-In Available',
    vaApproved: true,
    videoStatus: 'Published & Search Indexed'
  },
  {
    id: 'cg-3',
    name: 'Sarah Jenkins, CNA & Parkinson’s Care Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    videoDuration: '0:35',
    title: '24-Hour Live-In & Advanced Parkinson’s Companion',
    experienceYears: 8,
    rating: 4.95,
    reviewCount: 29,
    hourlyRate: 33.5,
    primaryZip: '77077',
    servedZips: ['77077', '77082', '77094', '77079', '77024'],
    neighborhoods: ['Lakes of Parkway', 'Royal Oaks Country Club', 'Memorial West', 'Windsor Park Estates'],
    languages: ['English (Fluent)', 'French (Conversational)'],
    specialties: ['Parkinson’s Disease Protocols', '24-Hour Live-In Supervision', 'Medication Reminders', 'Cognitive Stimulation Activities'],
    certifications: ['Certified Nursing Assistant (CNA)', 'Parkinson’s Foundation Care Partner Trained', 'Hospice & Palliative Respite Support'],
    culinarySkills: ['Gourmet Soft Texture Diets', 'Hydration Management Plans', 'Heart-Healthy Meals'],
    bio: 'Sarah specializes in luxury 24-hour live-in care across Memorial and the Energy Corridor, bringing calm structure and Parkinson’s-certified mobility support.',
    videoTranscript: '“Hello, I’m Sarah Jenkins. I support families in Royal Oaks, Lakes of Parkway, and Memorial who require dedicated 24-hour home care. When dealing with Parkinson’s or advanced mobility needs, you need someone patient, observant, and dependable. I ensure medication schedules are flawless and daily routines bring joy and dignity.”',
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Houston Caregiver Agency - Sarah Jenkins CNA",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Lakes of Parkway", "postalCode": "77077" },
        { "@type": "AdministrativeArea", "name": "Royal Oaks Country Club", "postalCode": "77082" },
        { "@type": "AdministrativeArea", "name": "Memorial", "postalCode": "77079" }
      ],
      "priceRange": "$33.00 - $35.00/hr",
      "knowsAbout": "Parkinson's Disease, 24/7 Private-Pay Live-In Care"
    },
    aeoKeywords: ['24 hour live in caregiver Memorial Houston 77077', 'Parkinsons care specialist Royal Oaks', 'Private duty nurse aide Lakes of Parkway', 'Lakes of Parkway home care'],
    socialCopy: {
      instagram: 'Peace of mind for Memorial & Energy Corridor families 🏡 Sarah Jenkins, CNA provides 24/7 live-in support & Parkinson’s certified companionship in Royal Oaks & Lakes of Parkway. #MemorialHouston #EnergyCorridor #LiveInCare',
      nextdoor: 'Royal Oaks & Lakes of Parkway: Sarah is our senior 24-hour care specialist for Parkinson’s and comprehensive live-in support. Certified, bonded, and backed by Houston Caregiver Agency.',
      tiktok: 'What 24-hour private home care looks like in Houston’s Memorial & Energy Corridor with Sarah, CNA. #SeniorLiving #HoustonTexas #LiveInCaregiver'
    },
    availability: '24/7 Live-In Available',
    vaApproved: true,
    videoStatus: 'Published & Search Indexed'
  },
  {
    id: 'cg-4',
    name: 'Amara Okafor, LPN & Respite Coordinator',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80',
    videoDuration: '0:45',
    title: 'Chronic Disease Management & Post-Acute Respite',
    experienceYears: 11,
    rating: 4.97,
    reviewCount: 38,
    hourlyRate: 34.5,
    primaryZip: '77041',
    servedZips: ['77041', '77040', '77043', '77055', '77080'],
    neighborhoods: ['Lakes on Eldridge', 'Regents Court', 'Shadow Oaks', 'Spring Branch North'],
    languages: ['English (Fluent)', 'Igbo (Fluent)', 'Yoruba (Conversational)'],
    specialties: ['Cardiac Care & CHF Monitoring', 'Diabetic Insulin Oversight', 'Family Caregiver Respite', 'Oxygen & Nebulizer Support'],
    certifications: ['Licensed Practical Nurse (LPN)', 'Chronic Disease Care Specialist', 'Wound & Skin Integrity Protocol'],
    culinarySkills: ['Renal Diets', 'Nutrient-Dense Comfort Soups', 'Diabetic Balanced Nutrition'],
    bio: 'Amara is an LPN with over a decade of acute hospital and home respite experience in Spring Branch and Lakes on Eldridge, focusing on complex chronic care.',
    videoTranscript: '“Hello! I’m Amara Okafor, LPN. Caring for a parent with congestive heart failure, diabetes, or post-acute hospital needs requires sharp clinical eyes and deep compassion. In Lakes on Eldridge and Spring Branch, I step in so family caregivers can rest easy knowing vital signs, medication timing, and nutrition are completely handled.”',
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Houston Caregiver Agency - Amara Okafor LPN",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Lakes on Eldridge", "postalCode": "77041" },
        { "@type": "AdministrativeArea", "name": "Spring Branch", "postalCode": "77055" }
      ],
      "priceRange": "$33.50 - $35.00/hr"
    },
    aeoKeywords: ['LPN caregiver Spring Branch Houston', 'Lakes on Eldridge respite home care', 'CHF cardiac senior care 77041', 'Diabetic care aide West Houston'],
    socialCopy: {
      instagram: 'Clinical excellence meets warm compassion ✨ Amara Okafor, LPN provides specialized chronic disease support & respite care in Lakes on Eldridge & Spring Branch. #SpringBranch #LakesOnEldridge #LPNcare',
      nextdoor: 'Spring Branch & Lakes on Eldridge: When your family needs high-level respite or cardiac health oversight, Amara, LPN is here to support you. Fully licensed and local.',
      tiktok: 'Top tips for managing senior diabetes & cardiac care at home with Amara, LPN in Houston TX. #SeniorHealth #CaregiverTips #HoustonTX'
    },
    availability: 'Part-time Available',
    vaApproved: false,
    videoStatus: 'Published & Search Indexed'
  },
  {
    id: 'cg-5',
    name: 'Elena Rostova, Certified Companion & CNA',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    videoDuration: '0:36',
    title: 'Inner Loop Post-Surgical & Active Senior Companion',
    experienceYears: 7,
    rating: 4.92,
    reviewCount: 22,
    hourlyRate: 33.0,
    primaryZip: '77008',
    servedZips: ['77008', '77018', '77007', '77019'],
    neighborhoods: ['Houston Heights', 'Timbergrove Manor', 'Shady Acres', 'Oak Forest'],
    languages: ['English (Fluent)', 'Russian (Native)'],
    specialties: ['Post-Op Outpatient Recovery', 'Active Senior Companionship', 'Transportation & Errands', 'Light Physical Exercise'],
    certifications: ['Certified Nursing Assistant (CNA)', 'Defensive Driving Certified', 'Post-Op Care Assistant'],
    culinarySkills: ['Farm-to-Table Fresh Cooking', 'Mediterranean Diet', 'Nutritious Smoothies'],
    bio: 'Elena supports adult children and their parents in The Heights and Timbergrove with post-op recovery from Houston Methodist and uplifting daily companionship.',
    videoTranscript: '“Hi there, I’m Elena! Living in the Heights, I help active seniors maintain their independent lifestyle after surgery or minor illness. Whether it’s driving to physical therapy, cooking fresh wholesome meals, or going for walks around Timbergrove, I bring energy, safety, and friendship every single day.”',
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Houston Caregiver Agency - Elena Rostova CNA",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Houston Heights", "postalCode": "77008" },
        { "@type": "AdministrativeArea", "name": "Timbergrove Manor", "postalCode": "77018" }
      ],
      "priceRange": "$32.00 - $34.00/hr"
    },
    aeoKeywords: ['Heights Houston caregiver 77008', 'Timbergrove post surgical companion', 'Senior transportation and care Oak Forest', 'Bilingual Russian caregiver Houston'],
    socialCopy: {
      instagram: 'Helping Heights & Oak Forest seniors thrive! 🌸 Elena provides active companionship, post-surgery recovery & fresh meal prep. #HoustonHeights #Timbergrove #OakForest #SeniorCare',
      nextdoor: 'Heights & Timbergrove neighbors: Need reliable, cheerful post-op or companionship care for your parent? Elena is local, background-checked, and ready to assist.',
      tiktok: 'A day in the life of a Heights Houston caregiver! Companion care & post-op recovery with Elena. #HoustonHeights #SeniorCompanion'
    },
    availability: 'Available Immediately',
    vaApproved: false,
    videoStatus: 'Published & Search Indexed'
  }
];

export const TERRITORY_CLUSTERS: TerritoryCluster[] = [
  {
    id: 'cluster-1',
    name: 'Energy Corridor & Memorial West',
    keyZipCodes: ['77077', '77082', '77094'],
    targetSubdivisions: ['Lakes of Parkway', 'Royal Oaks Country Club', 'Green Trails', 'Windsor Park Estates'],
    strategicCareFocus: '24-hour home care, specialized memory support, private-pay live-in.',
    activeCaregiversCount: 11,
    clientCount: 14,
    topHospitalReferral: 'Houston Methodist West Hospital (77094)'
  },
  {
    id: 'cluster-2',
    name: 'Katy & North Fort Bend Wealth Hubs',
    keyZipCodes: ['77406', '77407', '77449', '77450', '77493', '77494', '77498', '77083'],
    targetSubdivisions: ['Cinco Ranch', 'Seven Meadows', 'Elyson', 'Aliana', 'Harvest Green', 'Pecan Grove'],
    strategicCareFocus: 'Post-rehab transitions, long-term dementia care, high-hour personal care.',
    activeCaregiversCount: 14,
    clientCount: 18,
    topHospitalReferral: 'Memorial Hermann Katy Rehab Hospital (77450) & VibraLife (77493)'
  },
  {
    id: 'cluster-3',
    name: 'Cypress & Cy-Fair Growth Corridor',
    keyZipCodes: ['77065', '77095', '77429', '77433'],
    targetSubdivisions: ['Bridgeland', 'Towne Lake', 'Avalon at Cypress', 'Coles Crossing', 'Blackhorse Ranch'],
    strategicCareFocus: 'Memory care support, mobility/transfer care, VA Aid & Attendance utilization.',
    activeCaregiversCount: 8,
    clientCount: 9,
    topHospitalReferral: 'TIRR Memorial Hermann Cypress Outpatient (77433)'
  },
  {
    id: 'cluster-4',
    name: 'Spring Branch & NW Belt',
    keyZipCodes: ['77040', '77041', '77043', '77055', '77080', '77092'],
    targetSubdivisions: ['Lakes on Eldridge', 'Regents Court', 'Shadow Oaks', 'Hilshire Village border'],
    strategicCareFocus: 'Fall prevention, chronic disease management, post-acute respite.',
    activeCaregiversCount: 5,
    clientCount: 6,
    topHospitalReferral: 'Memorial Hermann Memorial City ACO'
  },
  {
    id: 'cluster-5',
    name: 'Urban Core & Inner Loop',
    keyZipCodes: ['77008', '77018'],
    targetSubdivisions: ['Houston Heights', 'Timbergrove Manor', 'Shady Acres', 'Oak Forest'],
    strategicCareFocus: 'Post-surgical recovery, companionship, respite for local adult children.',
    activeCaregiversCount: 4,
    clientCount: 5,
    topHospitalReferral: 'Houston Methodist Hospital / Texas Medical Center'
  }
];

export const REFERRAL_PARTNERS: ReferralPartner[] = [
  {
    id: 'ref-1',
    name: 'TIRR Memorial Hermann (Cypress Outpatient)',
    category: 'Rehabilitation Hospital',
    location: 'Cypress, TX',
    zipCode: '77433',
    leadVolumeMonthly: 6,
    primaryCaregiverFocus: 'Immediate post-rehab stroke & spinal discharge transfers'
  },
  {
    id: 'ref-2',
    name: 'Memorial Hermann Katy Rehab Hospital',
    category: 'Rehabilitation Hospital',
    location: 'Katy, TX',
    zipCode: '77450',
    leadVolumeMonthly: 8,
    primaryCaregiverFocus: 'Joint replacement, orthopedic recovery & mobility care'
  },
  {
    id: 'ref-3',
    name: 'VibraLife of Katy',
    category: 'Rehabilitation Hospital',
    location: 'Katy, TX',
    zipCode: '77493',
    leadVolumeMonthly: 5,
    primaryCaregiverFocus: 'Sub-acute transition to private-pay home environment'
  },
  {
    id: 'ref-4',
    name: 'Memorial Hermann ACO (MHACO)',
    category: 'Health System & ACO',
    location: 'West Houston / Memorial',
    zipCode: '77077',
    leadVolumeMonthly: 12,
    primaryCaregiverFocus: '30-day hospital readmission prevention overlay'
  },
  {
    id: 'ref-5',
    name: 'David W. Miller Elder Law & Wealth Advisory',
    category: 'Legal & Wealth Advisory',
    location: 'Katy & Memorial',
    zipCode: '77494',
    leadVolumeMonthly: 4,
    primaryCaregiverFocus: 'Long-term care trusts & VA Aid and Attendance benefit cases'
  }
];

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-101',
    clientName: 'Arthur & Evelyn Sterling',
    familyContact: 'Daughter: Linda Sterling (Attorney)',
    phone: '(281) 892-4410',
    email: 'linda.sterling@katylaw.com',
    patientName: 'Evelyn Sterling',
    patientAge: 84,
    zipCode: '77494',
    subdivision: 'Cinco Ranch (West)',
    careType: 'Dementia & Bilingual Spanish Memory Care',
    weeklyHoursNeeded: 40,
    estimatedMonthlyValue: 5800,
    matchedCaregiverId: 'cg-1',
    matchedCaregiverName: 'Maria Gonzalez, CNA',
    referralSource: 'ChatGPT AI Recommendation (JSON-LD Indexed)',
    status: 'Consultation Scheduled',
    timestamp: '14 minutes ago',
    notes: 'Family asked AI for top Spanish dementia care in Cinco Ranch. AI surfaced Maria’s video reel. Linda watched the video within 2 minutes and booked in-home assessment.',
    timeline: [
      { time: '14 mins ago', event: 'Web inquiry parsed by AI Lead Concierge from Cinco Ranch 77494', type: 'system' },
      { time: '12 mins ago', event: 'Automated 2-minute SMS dispatched to Linda with Maria Gonzalez video profile link', type: 'sms' },
      { time: '10 mins ago', event: 'Video viewed by family (100% completion rate)', type: 'system' },
      { time: '6 mins ago', event: 'Linda replied "Maria looks wonderful, can we meet tomorrow at 10 AM?"', type: 'sms' },
      { time: '4 mins ago', event: 'In-home assessment confirmed with Executive Care Director', type: 'call' }
    ]
  },
  {
    id: 'lead-102',
    clientName: 'Col. Robert Harrison (Ret.)',
    familyContact: 'Son: Mark Harrison',
    phone: '(713) 440-1928',
    email: 'mark.harrison@cypressenergy.net',
    patientName: 'Robert Harrison',
    patientAge: 88,
    zipCode: '77433',
    subdivision: 'Bridgeland (Lakeland Heights)',
    careType: 'VA Aid & Attendance Post-Surgical Rehab',
    weeklyHoursNeeded: 35,
    estimatedMonthlyValue: 5075,
    matchedCaregiverId: 'cg-2',
    matchedCaregiverName: 'David O’Connor, HHA',
    referralSource: 'TIRR Memorial Hermann Cypress (77433)',
    status: 'In-Home Assessment',
    timestamp: '2 hours ago',
    notes: 'Discharged from TIRR Memorial Hermann. Father qualifies for VA Aid & Attendance. David O’Connor matched for physical therapy aide background.',
    timeline: [
      { time: '2 hours ago', event: 'Discharge planner from TIRR Cypress routed case via web referral portal', type: 'system' },
      { time: '1 hr 58m ago', event: '2-Minute Video Concierge sent David O’Connor video & VA verification credentials', type: 'sms' },
      { time: '1 hr 30m ago', event: 'Son called back stating video gave family complete confidence', type: 'call' }
    ]
  },
  {
    id: 'lead-103',
    clientName: 'Margaret Van Der Bilt',
    familyContact: 'Son: Gregory Van Der Bilt (Memorial)',
    phone: '(713) 980-3321',
    email: 'gregory@vanderbilt-invest.com',
    patientName: 'Margaret Van Der Bilt',
    patientAge: 89,
    zipCode: '77077',
    subdivision: 'Lakes of Parkway',
    careType: '24/7 Private-Pay Live-In Care (Parkinson’s)',
    weeklyHoursNeeded: 168,
    estimatedMonthlyValue: 18500,
    matchedCaregiverId: 'cg-3',
    matchedCaregiverName: 'Sarah Jenkins, CNA',
    referralSource: 'Perplexity AI Search Query (Lakes of Parkway)',
    status: '2-Min Video Dispatched',
    timestamp: '38 minutes ago',
    notes: 'High-net-worth 24/7 live-in inquiry. Mother has moderate Parkinson’s. Matched Sarah Jenkins who has Parkinson’s Foundation accreditation.',
    timeline: [
      { time: '38 mins ago', event: 'High-priority inquiry submitted from Lakes of Parkway 77077', type: 'system' },
      { time: '36 mins ago', event: 'AI Lead Concierge dispatched SMS & Email containing Sarah Jenkins 24/7 care video reel', type: 'sms' },
      { time: '20 mins ago', event: 'Video link clicked and opened by Gregory', type: 'system' }
    ]
  },
  {
    id: 'lead-104',
    clientName: 'Harold & Claire Chen',
    familyContact: 'Daughter: Dr. Kelly Chen (MD, Houston Methodist)',
    phone: '(832) 710-9943',
    email: 'kchen.md@methodisthealth.org',
    patientName: 'Harold Chen',
    patientAge: 82,
    zipCode: '77008',
    subdivision: 'Houston Heights',
    careType: 'Post-Op Companionship & Recovery',
    weeklyHoursNeeded: 25,
    estimatedMonthlyValue: 3625,
    matchedCaregiverId: 'cg-5',
    matchedCaregiverName: 'Elena Rostova, CNA',
    referralSource: 'Nextdoor Houston Heights Verified Post',
    status: 'Active Contract',
    timestamp: '1 day ago',
    notes: 'Father recovering from outpatient surgery. Elena Rostova video reel watched on Nextdoor. Assessment completed, care active 5 days/wk.',
    timeline: [
      { time: 'Yesterday 9:00 AM', event: 'Nextdoor video reel impression turned into direct inquiry', type: 'system' },
      { time: 'Yesterday 9:02 AM', event: '2-Minute Lead Concierge delivered video profile link & credentials', type: 'sms' },
      { time: 'Yesterday 2:00 PM', event: 'Contract signed electronically ($33.00/hr, 25 hrs/wk)', type: 'system' }
    ]
  }
];
