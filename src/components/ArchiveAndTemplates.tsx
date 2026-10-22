import React, { useState } from 'react';
import { YouthEvent } from '../types';
import { 
  Archive, Search, LayoutTemplate, Plus, Calendar, MapPin, 
  BookOpen, Music, Users, ArrowRight, Sparkles, Copy
} from 'lucide-react';

interface ArchiveAndTemplatesProps {
  events: YouthEvent[];
  templates: YouthEvent[];
  onSelectEvent: (event: YouthEvent) => void;
  onCreateFromTemplate: (template: YouthEvent) => void;
}

export const ArchiveAndTemplates: React.FC<ArchiveAndTemplatesProps> = ({
  events,
  templates,
  onSelectEvent,
  onCreateFromTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Search filter across events
  const filteredEvents = events.filter(evt => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;

    const matchTitle = evt.title.toLowerCase().includes(term);
    const matchTheme = evt.theme.toLowerCase().includes(term);
    const matchPassage = evt.biblePassage.toLowerCase().includes(term);
    const matchDate = evt.date.includes(term);

    // Search inside setlist songs
    const matchSongs = evt.moments.some(m => 
      m.setlist?.some(s => s.title.toLowerCase().includes(term))
    );

    // Search inside team
    const matchTeam = evt.team.some(t => t.name.toLowerCase().includes(term));

    return matchTitle || matchTheme || matchPassage || matchDate || matchSongs || matchTeam;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-extrabold text-white flex items-center gap-2">
              <Archive className="w-6 h-6 text-indigo-400" />
              <span>Tablou de Bord & Arhivă Căutabilă</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Istoricul complet al serilor de tineret și galerii de șabloane pentru crearea rapidă de evenimente noi.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Templates Gallery (Șabloane) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-indigo-400" />
            <span>Șabloane Standard (Templates)</span>
          </h3>
          <span className="text-xs text-slate-400">Creare eveniment în 2 click-uri</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(tmpl => (
            <div
              key={tmpl.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-4 shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Şablon Standard
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-1.5 group-hover:text-indigo-300 transition-colors">
                    {tmpl.title}
                  </h4>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <p>• {tmpl.moments.length} momente prestabilite pe timpi de desfășurare</p>
                <p>• Include checklist pregătire & întrebări de grup</p>
              </div>

              <button
                onClick={() => onCreateFromTemplate(tmpl)}
                className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Creează Eveniment din Acest Șablon</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Searchable Archive (Istoric Căutabil) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Archive className="w-5 h-5 text-purple-400" />
            <span>Istoric Căutabil al Serilor Trecute</span>
          </h3>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută după titlu, piese, predicator, pasaj..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map(evt => {
              // Extract song titles from moments
              const songs = evt.moments.flatMap(m => m.setlist || []).map(s => s.title);

              return (
                <div
                  key={evt.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {evt.date || 'Fără Dată'}
                      </span>
                      <h4 className="font-display font-bold text-base text-white mt-1">
                        {evt.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>Deschide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                    <p className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{evt.biblePassage || 'Fără Pasaj'}</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{evt.metrics.totalAttendance || 0} Tineri</span>
                    </p>
                  </div>

                  {songs.length > 0 && (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                        <Music className="w-3 h-3 text-indigo-400" />
                        Piese cântate:
                      </span>
                      <p className="text-slate-300 truncate">{songs.join(' · ')}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            Niciun eveniment găsit pentru căutarea "{searchTerm}".
          </div>
        )}
      </div>

    </div>
  );
};
