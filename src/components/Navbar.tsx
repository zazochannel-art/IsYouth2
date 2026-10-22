import React from 'react';
import { Calendar, Users, Radio, BarChart3, Archive, Share2, Plus, Sparkles } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: 'rundown' | 'team' | 'live' | 'metrics' | 'archive';
  setActiveTab: (tab: 'rundown' | 'team' | 'live' | 'metrics' | 'archive') => void;
  onOpenExportModal: () => void;
  onNewEvent: () => void;
  eventTitle: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onNewEvent,
  eventTitle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand & Current Active Event Name */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg text-white tracking-tight">YouthFlow</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Agendă & Service Manager
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs font-medium">
                {eventTitle || 'Seară de Tineret'}
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('rundown')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'rundown'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1. Rundown</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'team'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2. Echipă & RSVP</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'live'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>3. Live & Q&A</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'metrics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>4. Metrice & Evaluare</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'archive'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>5. Arhivă & Șabloane</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <PWAInstallButton />

            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors whitespace-nowrap"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Exportă WhatsApp</span>
            </button>

            <button
              onClick={onNewEvent}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/20 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Eveniment Nou</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 overflow-x-auto text-xs gap-1">
          <button
            onClick={() => setActiveTab('rundown')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'rundown' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Rundown
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'team' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Echipă
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Live Q&A
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'metrics' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Metrice
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'archive' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Arhivă
          </button>
        </div>

      </div>
    </header>
  );
};
