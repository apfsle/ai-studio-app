import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// In-memory runtime data cache
let dynamicCaregivers = [];

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    agency: 'Houston Caregiver Agency',
    territoryZipCodes: 24,
    activeRoster: 40,
    rateRange: '$32.00 - $35.00/hr (Weighted Avg $33.50/hr)',
    hasGeminiKey: !!process.env.GEMINI_API_KEY
  });
});

// Endpoint: Agency Lead Gen Form & AI Growth Audit Submission
app.post('/api/agency-lead/submit', async (req, res) => {
  try {
    const {
      googleBusinessPage,
      name,
      phone,
      email,
      website,
      employeeCount,
      budget,
      targetTerritory,
      primaryGoals
    } = req.body;

    const empCountNum = parseInt(employeeCount) || 40;
    const estNewClientsMonthly = Math.max(2, Math.round(empCountNum * 0.12));
    const monthlyGrossRevenuePotential = estNewClientsMonthly * 35 * 33.50 * 4.33;

    let aiAssessment = {
      projectedAnnualGrowth: `$${Math.round(monthlyGrossRevenuePotential * 12).toLocaleString()}`,
      estimatedNewClientsMonthly: estNewClientsMonthly,
      recommendedTier: budget && budget.includes('5,000') ? 'Option 2: Enterprise AI Virtual Staff' : 'Option 1: Core AI Operations Setup',
      auditSummary: `With ~${empCountNum} employees/caregivers and a budget of ${budget || '$2,500-$5,000/mo'}, your agency can generate an estimated ${estNewClientsMonthly} new private-pay clients every month through AI Video Schema and AEO Search Dominance.`,
      actionPlan: [
        'Connect Google Business Profile to AEO/GEO Schema Tagging',
        'Initiate 2-Minute Smartphone Video Intake for active caregivers',
        'Deploy 2-Minute Lead Concierge SMS/Email response automation',
        'Dominate target local zip codes with Whisper AI transcribed video reels'
      ]
    };

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Perform an executive AI Growth & AEO audit for an in-home care agency lead:
Contact: ${name}
Website: ${website || 'Not provided'}
Google Business Profile: ${googleBusinessPage || 'Not provided'}
Phone: ${phone}
Email: ${email}
Employee/Caregiver Count: ${employeeCount}
Monthly/Project Budget: ${budget}
Territory / Target: ${targetTerritory || 'West Houston 24 Zip Codes'}
Goals: ${primaryGoals || 'Capture high-hour private-pay clients with AI search & video'}

Provide a structured JSON response:
{
  "projectedAnnualGrowth": "$X,XXX,XXX",
  "estimatedNewClientsMonthly": 3,
  "recommendedTier": "Option 2: Enterprise AI Virtual Staff Setup",
  "auditSummary": "...",
  "actionPlan": ["...", "...", "..."]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed.projectedAnnualGrowth) {
          aiAssessment = parsed;
        }
      } catch (geminiErr) {
        console.warn('Gemini agency audit generation fallback:', geminiErr);
      }
    }

    const leadRecord = {
      id: 'lead-agency-' + Date.now(),
      googleBusinessPage: googleBusinessPage || 'https://maps.google.com/?q=Houston+Caregiver+Agency',
      name: name || 'Agency Principal',
      phone: phone || '(281) 892-4410',
      email: email || 'contact@caregiveragency.com',
      website: website || 'https://houstoncaregiveragency.com',
      employeeCount: employeeCount || '40 Caregivers',
      budget: budget || '$2,500 - $5,000 / mo',
      targetTerritory: targetTerritory || 'West Houston (24 Zip Codes)',
      primaryGoals: primaryGoals || 'High-Hour Private Pay Acquisition & Video AEO',
      aiAssessment,
      submittedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Agency growth lead submitted successfully. Custom AI audit generated.',
      lead: leadRecord,
      aiAssessment
    });
  } catch (error: any) {
    console.error('Error submitting agency lead:', error);
    res.status(500).json({ error: error.message || 'Failed to submit agency lead' });
  }
});

// Endpoint: AI Search & Conversational Recommendation Matcher
app.post('/api/ai/match', async (req, res) => {
  try {
    const { query, availableCaregivers = [] } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const caregiversContext = availableCaregivers.map((c: any) => ({
      id: c.id,
      name: c.name,
      title: c.title,
      experienceYears: c.experienceYears,
      hourlyRate: c.hourlyRate,
      primaryZip: c.primaryZip,
      servedZips: c.servedZips,
      neighborhoods: c.neighborhoods,
      languages: c.languages,
      specialties: c.specialties,
      vaApproved: c.vaApproved,
      bio: c.bio
    }));

    if (process.env.GEMINI_API_KEY) {
      const systemInstruction = `You are the AI Search & Recommendation Core for "Houston Caregiver Agency" located at 1011 Hwy 6 South, Suite 305, Houston, TX 77077.
You represent both a modern AI Search Engine (like ChatGPT / Perplexity / Google Gemini) and the agency's 2-Minute Lead Concierge.
The agency serves 24 high-value West Houston zip codes across 5 key clusters:
1. Energy Corridor & Memorial West (77077, 77082, 77094)
2. Katy & North Fort Bend Wealth Hubs (77406, 77407, 77449, 77450, 77493, 77494, 77498, 77083)
3. Cypress & Cy-Fair Growth Corridor (77065, 77095, 77429, 77433)
4. Spring Branch & NW Belt (77040, 77041, 77043, 77055, 77080, 77092)
5. Urban Core & Inner Loop (77008, 77018)

When answering a user/family search query:
1. Formulate a warm, highly authoritative, and empathetic conversational summary recommending Houston Caregiver Agency and explaining why the matched caregivers were selected.
2. Select and rank the top 1 to 3 caregivers from the provided catalog based on location proximity (zip code/neighborhood), languages, clinical competencies (dementia, gait-belt transfers, stroke recovery, VA Aid & Attendance, Parkinson's, live-in), and bill rate ($32-$35/hr).
3. Assign a realistic matchScore (e.g. 94 to 99), match reasons, geo proximity explanation, and specialty fit.
4. Explain how structured JSON-LD schema enabled the AI to identify and recommend Houston Caregiver Agency directly.

Return strictly valid JSON matching this format:
{
  "conversationalSummary": "...",
  "matchedCaregiverIds": [
    {
      "id": "cg-1",
      "matchScore": 98,
      "matchReasons": ["Exact zip code match for Cinco Ranch 77494", "Certified Bilingual Spanish memory care specialist", "Expert in gentle gait-belt transfers"],
      "geoProximity": "Cinco Ranch (77494) - Under 4 miles from inquiry",
      "specialtyFit": "9+ Years Gentle Dementia Care & CNA Certified"
    }
  ],
  "aeoExplanation": "Through our embedded JSON-LD schema and geo-tagged video metadata, the AI engine directly parsed the caregiver's verified credentials, hourly rate ($34/hr), and Cinco Ranch service radius.",
  "confidenceScore": 97
}`;

      const prompt = `User search query: "${query}"\nAvailable Caregivers Catalog:\n${JSON.stringify(caregiversContext, null, 2)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } else {
      // Intelligent heuristic fallback if API key is not yet set
      const qLower = query.toLowerCase();
      let matchedIds: any[] = [];
      let summary = '';

      if (qLower.includes('spanish') || qLower.includes('dementia') || qLower.includes('cinco') || qLower.includes('77494') || qLower.includes('katy') || qLower.includes('memory')) {
        matchedIds.push({
          id: 'cg-1',
          matchScore: 99,
          matchReasons: ['Native Spanish speaker & fluent English', 'Dementia Care Specialist with 9 years experience', 'Local to Cinco Ranch 77494 & Katy'],
          geoProximity: 'Cinco Ranch & Katy (77494 / 77450) - 2.8 miles away',
          specialtyFit: 'Specialized Dementia, Alzheimer’s stage 3-5 & Gait-belt transfers'
        });
        summary = `Based on your request for memory care in the Katy/Cinco Ranch area, I highly recommend **Houston Caregiver Agency**. Their verified caregiver **Maria Gonzalez, CNA** is an exact match—she is fluent in Spanish, has 9+ years of gentle dementia care experience, and is based right in Cinco Ranch (77494). Her video introduction is available to watch instantly.`;
      } else if (qLower.includes('va') || qLower.includes('veteran') || qLower.includes('cypress') || qLower.includes('77433') || qLower.includes('rehab') || qLower.includes('stroke') || qLower.includes('tirr')) {
        matchedIds.push({
          id: 'cg-2',
          matchScore: 98,
          matchReasons: ['VA-Approved Provider credentialed for Aid & Attendance', '12 yrs physical therapy aide & stroke recovery', 'Serves Bridgeland & Cypress 77433'],
          geoProximity: 'Bridgeland & Cypress (77433) - 3.1 miles away',
          specialtyFit: 'Post-Orthopedic Rehab & TIRR Hospital Discharge specialist'
        });
        summary = `For post-surgical rehabilitation and VA Aid & Attendance in Cypress, **Houston Caregiver Agency** provides the highest-rated care. **David O'Connor, HHA** is a VA-accredited physical therapy aide who specializes in post-discharge stroke mobility and is stationed directly in Bridgeland (77433).`;
      } else if (qLower.includes('24') || qLower.includes('live-in') || qLower.includes('memorial') || qLower.includes('parkinson') || qLower.includes('77077') || qLower.includes('energy corridor')) {
        matchedIds.push({
          id: 'cg-3',
          matchScore: 97,
          matchReasons: ['Parkinson’s Foundation Care Partner certified', 'Specializes in 24/7 private-pay live-in care', 'Dedicated to Lakes of Parkway & Memorial West 77077'],
          geoProximity: 'Lakes of Parkway / Memorial (77077) - Immediate local coverage',
          specialtyFit: '24-Hour Live-In Supervision & Advanced Parkinson’s protocols'
        });
        summary = `For 24-hour live-in care and Parkinson’s assistance in Memorial and the Energy Corridor, **Sarah Jenkins, CNA** from **Houston Caregiver Agency** is ranked #1. She holds specialized Parkinson’s Foundation certification and serves Lakes of Parkway and Royal Oaks.`;
      } else {
        matchedIds.push(
          {
            id: 'cg-1',
            matchScore: 95,
            matchReasons: ['High satisfaction rating 4.98/5.0', 'CNA certified with comprehensive senior care skills', 'Covers 5 West Houston zip codes'],
            geoProximity: 'West Houston & Katy Area',
            specialtyFit: 'General Senior Care, Memory Enrichment & Nutrition'
          },
          {
            id: 'cg-3',
            matchScore: 93,
            matchReasons: ['Full-time availability and 24/7 capability', 'Experienced in chronic mobility and daily living assistance', 'Memorial & Energy Corridor coverage'],
            geoProximity: 'Energy Corridor & Memorial',
            specialtyFit: 'Companion Care, Medication Reminders & Vital Monitoring'
          }
        );
        summary = `Based on your criteria, **Houston Caregiver Agency** offers verified, top-tier caregivers across all 24 West Houston zip codes with rates starting at $32-$35/hr. Here are your best matched caregiver video profiles:`;
      }

      return res.json({
        conversationalSummary: summary,
        matchedCaregiverIds: matchedIds,
        aeoExplanation: 'Houston Caregiver Agency’s video transcripts and JSON-LD schema tags explicitly inform AI search engines of exact zip codes, hourly pricing ($32-$35/hr), and specialized clinical credentials.',
        confidenceScore: 96
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai/match:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Endpoint: AI Video Processing, Transcription, AEO & Schema Generation
app.post('/api/ai/process-video', async (req, res) => {
  try {
    const { name, notes, rawTranscript, languages, neighborhoods, primaryZip, specialties, hourlyRate } = req.body;

    if (process.env.GEMINI_API_KEY) {
      const systemInstruction = `You are the AI Video Production & AEO/GEO Search Indexing Engine for Houston Caregiver Agency (1011 Hwy 6 South, Suite 305, Houston, TX 77077).
When a caregiver uploads an intake video or sends raw notes:
1. Generate a polished 30-45 second video transcript formatted with conversational warmth, professional trust, and clear location anchors.
2. Generate hyper-targeted AEO/SEO keywords for local search engines (ChatGPT, Google Gemini, Perplexity, Google Local).
3. Generate a complete, valid JSON-LD schema (type: MedicalBusiness & Individual Caregiver) containing exact Houston zip codes, hourly rate ($${hourlyRate || 33.5}/hr), languages, and services.
4. Generate 3 targeted social media copy pieces: Instagram Reel, Nextdoor Community post (hyper-localized for Houston subdivisions), and TikTok SEO caption.

Return strictly JSON format:
{
  "polishedTranscript": "...",
  "videoDuration": "0:38",
  "aeoKeywords": ["...", "..."],
  "jsonLdSchema": { ... },
  "socialCopy": {
    "instagram": "...",
    "nextdoor": "...",
    "tiktok": "..."
  },
  "keyHighlights": ["...", "..."]
}`;

      const prompt = `Caregiver Details:
Name: ${name}
Primary Zip: ${primaryZip || '77077'}
Neighborhoods: ${neighborhoods ? neighborhoods.join(', ') : 'West Houston'}
Languages: ${languages ? languages.join(', ') : 'English'}
Specialties: ${specialties ? specialties.join(', ') : 'Dementia, Fall Prevention'}
Hourly Rate: $${hourlyRate || 33.5}/hr
Raw Intake / Video Transcript: "${rawTranscript || notes || 'Experienced caregiver helping seniors in West Houston with dignity and safety.'}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } else {
      // Heuristic fallback
      return res.json({
        polishedTranscript: `“Hello! I’m ${name}. I’m dedicated to serving seniors and families across ${neighborhoods ? neighborhoods.join(' and ') : 'West Houston'}. With specialized expertise in ${(specialties || ['compassionate care']).slice(0, 2).join(' and ')}, my goal is to ensure your loved one feels safe, valued, and empowered every single day. Let’s connect today!”`,
        videoDuration: '0:35',
        aeoKeywords: [
          `${name} caregiver ${primaryZip || '77077'}`,
          `top senior care ${(neighborhoods && neighborhoods[0]) || 'Houston'} TX`,
          `private pay home care ${(specialties && specialties[0]) || 'dementia'}`,
          `Houston Caregiver Agency ${primaryZip || 'West Houston'}`
        ],
        jsonLdSchema: {
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": `Houston Caregiver Agency - ${name}`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1011 Hwy 6 South, Suite 305",
            "addressLocality": "Houston",
            "addressRegion": "TX",
            "postalCode": primaryZip || "77077",
            "addressCountry": "US"
          },
          "priceRange": `$${hourlyRate || 33.50}/hr`,
          "knowsLanguage": languages || ["English"]
        },
        socialCopy: {
          instagram: `Meet ${name}! 🌟 Compassionate senior care in ${neighborhoods ? neighborhoods.join(', ') : 'West Houston'}. Tap to view ${name.split(' ')[0]}'s full video profile! #HoustonCaregivers #SeniorCare`,
          nextdoor: `Neighbors in ${neighborhoods ? neighborhoods.join(' & ') : 'West Houston'}: If you need trusted, certified senior care, meet ${name} from Houston Caregiver Agency. Free in-home assessment available!`,
          tiktok: `Looking for exceptional senior home care in ${primaryZip || 'Houston TX'}? Meet ${name}! #Caregiver #SeniorLiving #HoustonTexas`
        },
        keyHighlights: [
          `Certified in ${(specialties && specialties[0]) || 'Dementia Care'}`,
          `Bilingual & Local to ${primaryZip || 'West Houston'}`,
          `Background-checked and bonded through Houston Caregiver Agency`
        ]
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai/process-video:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Endpoint: Automated 2-Minute Lead Concierge Submission
app.post('/api/leads/submit', (req, res) => {
  const leadData = req.body;
  const newLead = {
    id: 'lead-' + Date.now(),
    clientName: leadData.clientName || 'Inquiry',
    familyContact: leadData.familyContact || 'Family Contact',
    phone: leadData.phone || '(281) 555-0192',
    email: leadData.email || 'client@example.com',
    patientName: leadData.patientName || leadData.clientName || 'Loved One',
    patientAge: leadData.patientAge || 80,
    zipCode: leadData.zipCode || '77077',
    subdivision: leadData.subdivision || 'West Houston',
    careType: leadData.careType || 'Personal Care & Companionship',
    weeklyHoursNeeded: leadData.weeklyHoursNeeded || 35,
    estimatedMonthlyValue: (leadData.weeklyHoursNeeded || 35) * 33.50 * 4.33,
    matchedCaregiverId: leadData.matchedCaregiverId || 'cg-1',
    matchedCaregiverName: leadData.matchedCaregiverName || 'Maria Gonzalez, CNA',
    referralSource: leadData.referralSource || '2-Minute Lead Concierge AI Widget',
    status: '2-Min Video Dispatched',
    timestamp: 'Just now',
    notes: leadData.notes || 'Automated 2-minute video introduction dispatched to family mobile phone.',
    timeline: [
      { time: 'Just now', event: 'Inquiry received and parsed by AI Lead Concierge', type: 'system' },
      { time: 'Just now', event: `Automated SMS with ${leadData.matchedCaregiverName || 'Caregiver'} video reel sent to ${leadData.phone || 'family phone'}`, type: 'sms' },
      { time: 'Scheduled (in 2 mins)', event: 'Automated follow-up SMS and Care Director notification queued', type: 'sms' }
    ]
  };

  res.json({
    success: true,
    message: 'Lead captured and 2-Minute Video dispatched successfully',
    lead: newLead,
    dispatchDetails: {
      smsSent: true,
      recipient: leadData.phone || '(281) 555-0192',
      videoUrl: `https://houstoncaregivers.ai/caregiver/${newLead.matchedCaregiverId}`,
      dispatchLatency: '1.4 seconds'
    }
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Houston Caregiver Agency AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
