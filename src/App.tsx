import React, { useState } from 'react';
import { INITIAL_EVENTS, TEMPLATE_EVENTS, INITIAL_PRAYER_BANK } from './mockData';
import { YouthEvent, PrayerBankEntry } from './types';
import { Navbar } from './components/Navbar';
import { RundownEditor } from './components/RundownEditor';
import { TeamManagement } from './components/TeamManagement';
import { LiveEventView } from './components/LiveEventView';
import { MetricsAndAnalytics } from './components/MetricsAndAnalytics';
import { ArchiveAndTemplates } from './components/ArchiveAndTemplates';
import { WhatsAppExportModal } from './components/WhatsAppExportModal';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [events, setEvents] = useState<YouthEvent[]>(INITIAL_EVENTS);
  const [activeEventId, setActiveEventId] = useState<string>(INITIAL_EVENTS[0].id);
  const [activeTab, setActiveTab] = useState<'rundown' | 'team' | 'live' | 'metrics' | 'archive'>('rundown');

  const [prayerBank, setPrayerBank] = useState<PrayerBankEntry[]>(INITIAL_PRAYER_BANK);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [aiModalConfig, setAiModalConfig] = useState<{
    isOpen: boolean;
    type: 'breakout' | 'icebreaker' | 'sermon';
    momentId: string;
  }>({
    isOpen: false,
    type: 'breakout',
    momentId: ''
  });

  const activeEvent = events.find(e => e.id === activeEventId) || events[0];

  const handleUpdateEvent = (updated: YouthEvent) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleCreateNewEvent = () => {
    const template = TEMPLATE_EVENTS[0];
    const newId = `evt-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newEvent: YouthEvent = {
      ...template,
      id: newId,
      title: 'Seară de Tineret - Noua Ediție',
      date: todayStr,
      isTemplate: false,
      status: 'draft'
    };

    setEvents(prev => [newEvent, ...prev]);
    setActiveEventId(newId);
    setActiveTab('rundown');
  };

  const handleCreateFromTemplate = (template: YouthEvent) => {
    const newId = `evt-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newEvent: YouthEvent = {
      ...template,
      id: newId,
      title: `Seară de Tineret (${todayStr})`,
      date: todayStr,
      isTemplate: false,
      status: 'draft'
    };

    setEvents(prev => [newEvent, ...prev]);
    setActiveEventId(newId);
    setActiveTab('rundown');
  };

  const handleSaveToPrayerBank = (motiveContent: string) => {
    const newEntry: PrayerBankEntry = {
      id: `prb-${Date.now()}`,
      content: motiveContent,
      dateAdded: activeEvent.date || new Date().toISOString().split('T')[0],
      eventTitle: activeEvent.title,
      status: 'active'
    };
    setPrayerBank(prev => [newEntry, ...prev]);
  };

  const handleAddPrayerEntryManual = (content: string, eventTitle: string) => {
    const newEntry: PrayerBankEntry = {
      id: `prb-${Date.now()}`,
      content,
      dateAdded: new Date().toISOString().split('T')[0],
      eventTitle,
      status: 'active'
    };
    setPrayerBank(prev => [newEntry, ...prev]);
  };

  const handleDeletePrayerEntry = (id: string) => {
    setPrayerBank(prev => prev.filter(p => p.id !== id));
  };

  // AI Modal Handler
  const handleOpenAiModal = (type: 'breakout' | 'icebreaker' | 'sermon', momentId: string) => {
    setAiModalConfig({
      isOpen: true,
      type,
      momentId
    });
  };

  const handleApplyAiResult = (type: 'breakout' | 'icebreaker' | 'sermon', momentId: string, resultData: any) => {
    const updatedMoments = activeEvent.moments.map(m => {
      if (m.id === momentId) {
        if (type === 'breakout' && resultData.questions) {
          return { ...m, breakoutQuestions: resultData.questions };
        } else if (type === 'icebreaker') {
          return {
            ...m,
            title: `Joc: ${resultData.title || m.title}`,
            activityType: resultData.category || 'Icebreaker Interactiv',
            materialsNeeded: resultData.materialsNeeded || [],
            details: `Reguli:\n${resultData.rules?.join('\n') || ''}\n\nSfat Lider: ${resultData.leaderTip || ''}`
          };
        } else if (type === 'sermon') {
          const mainPointsStr = resultData.mainPoints?.map((p: any) => `• ${p.point}: ${p.explanation}`).join('\n') || '';
          return {
            ...m,
            title: `Mesaj: ${resultData.title || m.title}`,
            biblePassage: resultData.keyVerse || activeEvent.biblePassage,
            details: `Schiță Predică:\n${mainPointsStr}\n\nAplicație Practică:\n${resultData.practicalTakeaway || ''}\n\nMotiv Rugăciune:\n${resultData.prayerPrompt || ''}`
          };
        }
      }
      return m;
    });

    handleUpdateEvent({ ...activeEvent, moments: updatedMoments });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onNewEvent={handleCreateNewEvent}
        eventTitle={activeEvent.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'rundown' && (
          <RundownEditor
            event={activeEvent}
            onUpdateEvent={handleUpdateEvent}
            onTriggerAiModal={handleOpenAiModal}
          />
        )}

        {activeTab === 'team' && (
          <TeamManagement
            event={activeEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        )}

        {activeTab === 'live' && (
          <LiveEventView
            event={activeEvent}
            onUpdateEvent={handleUpdateEvent}
            onSaveToPrayerBank={handleSaveToPrayerBank}
          />
        )}

        {activeTab === 'metrics' && (
          <MetricsAndAnalytics
            event={activeEvent}
            onUpdateEvent={handleUpdateEvent}
            prayerBank={prayerBank}
            onAddPrayerEntry={handleAddPrayerEntryManual}
            onDeletePrayerEntry={handleDeletePrayerEntry}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveAndTemplates
            events={events}
            templates={TEMPLATE_EVENTS}
            onSelectEvent={(evt) => {
              setActiveEventId(evt.id);
              setActiveTab('rundown');
            }}
            onCreateFromTemplate={handleCreateFromTemplate}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>YouthFlow — Sistem Integrat de Planificare & Gestiune a Serilor de Tineret © 2026</p>
      </footer>

      {/* WhatsApp Export Modal */}
      {isExportModalOpen && (
        <WhatsAppExportModal
          event={activeEvent}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {/* AI Generator Modal */}
      {aiModalConfig.isOpen && (
        <AiGeneratorModal
          type={aiModalConfig.type}
          momentId={aiModalConfig.momentId}
          topic={activeEvent.theme}
          biblePassage={activeEvent.biblePassage}
          onApplyResult={handleApplyAiResult}
          onClose={() => setAiModalConfig({ isOpen: false, type: 'breakout', momentId: '' })}
        />
      )}

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />

    </div>
  );
}
