import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  Calendar, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  ArrowRight,
  Filter,
  Eye,
  PlusCircle,
  Play
} from 'lucide-react';
import { LeadInquiry, Caregiver } from '../types';
import confetti from 'canvas-confetti';

interface StageCRMLeadsProps {
  leads: LeadInquiry[];
  caregivers: Caregiver[];
  onAdvanceLeadStatus: (leadId: string, newStatus: LeadInquiry['status']) => void;
  onAddNewLead: () => void;
  onOpenVideoModal: (caregiver: Caregiver) => void;
}

export const StageCRMLeads: React.FC<StageCRMLeadsProps> = ({
  leads,
  caregivers,
  onAdvanceLeadStatus,
  onAddNewLead,
  onOpenVideoModal
}) => {
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(leads[0] || null);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const statuses: LeadInquiry['status'][] = [
    'New Inquiry',
    '2-Min Video Dispatched',
    'Consultation Scheduled',
    'In-Home Assessment',
    'Active Contract'
  ];

  const filteredLeads = leads.filter(lead => {
    if (filterSource === 'all') return true;
    return lead.referralSource.toLowerCase().includes(filterSource.toLowerCase());
  });

  // Calculate Pipeline Metrics
  const totalMonthlyValue = leads.reduce((acc, l) => acc + l.estimatedMonthlyValue, 0);
  const activeContractsCount = leads.filter(l => l.status === 'Active Contract').length;
  const inPipelineCount = leads.length;

  const handleSignContract = (lead: LeadInquiry) => {
    onAdvanceLeadStatus(lead.id, 'Active Contract');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
              4. Lead Conversion & CRM
            </span>
            <span className="text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-600 font-medium">
              2-Minute Dispatch • 99.4% Velocity
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1.5">
            2-Minute Lead Concierge & CRM Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Within 2 minutes of inquiry, an automated SMS/Email delivers personalized video introductions of matched caregivers. 
            Profound emotional trust is built before competitors even dial their phone.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddNewLead}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Simulate New High-Hour Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Active Pipeline</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{leads.length} Inquiries</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            Avg $5,000 / mo gross per client
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pipeline Monthly Value</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
            ${totalMonthlyValue.toLocaleString()} / mo
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Based on 35 hrs/wk @ $33.50/hr
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">2-Minute Response Rate</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-indigo-700 mt-1">99.4% Velocity</p>
          <p className="text-[11px] text-indigo-600 font-medium mt-0.5">
            Avg SMS dispatch in 1.4 seconds
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Signed Private Contracts</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {activeContractsCount} Active
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            100% 1-Client Payback Achieved
          </p>
        </div>
      </div>

      {/* Main CRM Workspace: Kanban & Lead Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Kanban Board */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Attribution Source:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto text-[11px]">
              <button
                onClick={() => setFilterSource('all')}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  filterSource === 'all' ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Sources
              </button>
              <button
                onClick={() => setFilterSource('Google')}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  filterSource === 'Google' ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Google Search
              </button>
              <button
                onClick={() => setFilterSource('TIRR')}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  filterSource === 'TIRR' ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                TIRR Rehab
              </button>
              <button
                onClick={() => setFilterSource('ChatGPT')}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  filterSource === 'ChatGPT' ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                AI Gemini/ChatGPT
              </button>
              <button
                onClick={() => setFilterSource('Nextdoor')}
                className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                  filterSource === 'Nextdoor' ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Nextdoor
              </button>
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="space-y-4">
            {statuses.map((status) => {
              const columnLeads = filteredLeads.filter(l => l.status === status);
              return (
                <div key={status} className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/90 space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {status} ({columnLeads.length})
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Est. Monthly: ${columnLeads.reduce((a, b) => a + b.estimatedMonthlyValue, 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {columnLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id;
                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-3.5 rounded-xl border bg-white transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-slate-900">{lead.clientName}</p>
                              <p className="text-[11px] text-slate-500">
                                {lead.subdivision} ({lead.zipCode}) • {lead.familyContact}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0">
                              ${lead.estimatedMonthlyValue.toLocaleString()}/mo
                            </span>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-blue-700 font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-blue-600" />
                              Matched: {lead.matchedCaregiverName.split(',')[0]}
                            </span>
                            <span className="text-slate-400 text-[10px]">{lead.timestamp}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lead Detail & 2-Minute SMS Simulator Drawer */}
        <div className="lg:col-span-5 space-y-4">
          {selectedLead ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-5">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {selectedLead.referralSource}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ${selectedLead.estimatedMonthlyValue.toLocaleString()} / mo
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{selectedLead.clientName}</h3>
                <p className="text-xs text-slate-500">
                  {selectedLead.subdivision} ({selectedLead.zipCode}) • Patient: {selectedLead.patientName} (Age {selectedLead.patientAge})
                </p>
              </div>

              {/* Family Contact Info */}
              <div className="bg-slate-50/80 rounded-xl p-3.5 space-y-2 text-xs text-slate-700 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold text-slate-900">{selectedLead.familyContact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-slate-900 font-semibold">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Care Focus:</span>
                  <span className="font-semibold text-blue-800">{selectedLead.careType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Weekly Schedule:</span>
                  <span className="font-bold text-slate-900">{selectedLead.weeklyHoursNeeded} hours / week</span>
                </div>
              </div>

              {/* 2-Minute Automated Video SMS Dispatch Simulator */}
              <div className="border border-blue-200 bg-blue-50/40 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>2-Minute Automated SMS Delivery (Simulated)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    Delivered in 1.4s
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-blue-100 text-xs text-slate-800 space-y-2.5 shadow-2xs">
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    “Hi {selectedLead.familyContact.split(':')[1] || 'there'}, thank you for reaching out to Houston Caregiver Agency. Based on your need for {selectedLead.careType} in {selectedLead.subdivision}, we have reserved <strong>{selectedLead.matchedCaregiverName}</strong> for your family. Watch their 30-second personal video introduction below:”
                  </p>
                  
                  {/* Video Thumbnail Button */}
                  <div
                    onClick={() => {
                      const cg = caregivers.find(c => c.id === selectedLead.matchedCaregiverId) || caregivers[0];
                      onOpenVideoModal(cg);
                    }}
                    className="flex items-center gap-3 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Watch {selectedLead.matchedCaregiverName.split(',')[0]}’s Video Reel</p>
                      <p className="text-[10px] text-blue-300">Tap to play introduction & book assessment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Timeline */}
              <div>
                <span className="text-xs font-bold text-slate-800 mb-2 block">
                  Lead Qualification & Concierge History:
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></span>
                      <div>
                        <p className="text-slate-800 font-medium">{event.event}</p>
                        <p className="text-[10px] text-slate-400">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pipeline Advancement Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAdvanceLeadStatus(selectedLead.id, 'Consultation Scheduled')}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Set Consultation</span>
                  </button>

                  <button
                    onClick={() => onAdvanceLeadStatus(selectedLead.id, 'In-Home Assessment')}
                    className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 border border-blue-200 cursor-pointer transition-all"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Book Assessment</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSignContract(selectedLead)}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full text-xs flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Execute Contract (${selectedLead.estimatedMonthlyValue.toLocaleString()}/mo Private Pay)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-400 border border-slate-200">
              Select a lead from the pipeline to inspect live communications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
