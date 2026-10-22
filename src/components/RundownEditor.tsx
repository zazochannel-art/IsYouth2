import React, { useState } from 'react';
import { YouthEvent, MomentItem, SongItem } from '../types';
import { recalculateMomentTimes } from '../utils/exportUtils';
import { 
  Clock, Plus, Trash2, ArrowUp, ArrowDown, Music, Gamepad2, 
  BookOpen, Heart, Users, Sparkles, ChevronDown, ChevronUp, FileText,
  MapPin, Calendar as CalendarIcon, Tag, AlignLeft, Check
} from 'lucide-react';

interface RundownEditorProps {
  event: YouthEvent;
  onUpdateEvent: (updated: YouthEvent) => void;
  onTriggerAiModal: (type: 'breakout' | 'icebreaker' | 'sermon', momentId: string) => void;
}

export const RundownEditor: React.FC<RundownEditorProps> = ({
  event,
  onUpdateEvent,
  onTriggerAiModal
}) => {
  const [expandedMomentId, setExpandedMomentId] = useState<string | null>(event.moments[0]?.id || null);
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  // Header form local state
  const [headerTitle, setHeaderTitle] = useState(event.title);
  const [headerDate, setHeaderDate] = useState(event.date);
  const [headerStartTime, setHeaderStartTime] = useState(event.startTime);
  const [headerLocation, setHeaderLocation] = useState(event.location);
  const [headerTheme, setHeaderTheme] = useState(event.theme);
  const [headerPassage, setHeaderPassage] = useState(event.biblePassage);

  const saveHeaderChanges = () => {
    const recalculated = recalculateMomentTimes(headerStartTime, event.moments);
    onUpdateEvent({
      ...event,
      title: headerTitle,
      date: headerDate,
      startTime: headerStartTime,
      location: headerLocation,
      theme: headerTheme,
      biblePassage: headerPassage,
      moments: recalculated
    });
    setIsEditingHeader(false);
  };

  const handleDurationChange = (momentId: string, newDuration: number) => {
    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId) {
        return { ...m, durationMinutes: Math.max(1, newDuration) };
      }
      return m;
    });
    const recalculated = recalculateMomentTimes(event.startTime, updatedMoments);
    onUpdateEvent({ ...event, moments: recalculated });
  };

  const handleUpdateMomentField = (momentId: string, field: keyof MomentItem, value: any) => {
    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId) {
        return { ...m, [field]: value };
      }
      return m;
    });
    onUpdateEvent({ ...event, moments: updatedMoments });
  };

  const handleMoveMoment = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= event.moments.length) return;

    const momentsCopy = [...event.moments];
    const temp = momentsCopy[index];
    momentsCopy[index] = momentsCopy[targetIdx];
    momentsCopy[targetIdx] = temp;

    const recalculated = recalculateMomentTimes(event.startTime, momentsCopy);
    onUpdateEvent({ ...event, moments: recalculated });
  };

  const handleDeleteMoment = (momentId: string) => {
    const filtered = event.moments.filter(m => m.id !== momentId);
    const recalculated = recalculateMomentTimes(event.startTime, filtered);
    onUpdateEvent({ ...event, moments: recalculated });
  };

  const handleAddMoment = () => {
    const newId = `m-${Date.now()}`;
    const newMoment: MomentItem = {
      id: newId,
      title: 'Moment Nou / Anunț Special',
      startTime: '20:15',
      endTime: '20:25',
      durationMinutes: 10,
      responsiblePerson: 'Coordonator',
      department: 'general',
      details: 'Introduceți detaliile pentru acest moment...',
      resources: []
    };
    const updated = [...event.moments, newMoment];
    const recalculated = recalculateMomentTimes(event.startTime, updated);
    onUpdateEvent({ ...event, moments: recalculated });
    setExpandedMomentId(newId);
  };

  // Song additions for Laudă și Închinare moment
  const handleAddSongToMoment = (momentId: string) => {
    const songName = prompt('Titlu piesa nouă (ex: "Cât de Mare ești"):');
    if (!songName) return;
    const songKey = prompt('Gama / Tonalitate (ex: "G dur", "D dur"):', 'G dur') || 'G dur';

    const newSong: SongItem = {
      id: `song-${Date.now()}`,
      title: songName,
      key: songKey,
      attachments: [{ id: `att-${Date.now()}`, name: 'Acorduri Chitară', type: 'chords', url: '#' }]
    };

    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId) {
        const setlist = m.setlist || [];
        return { ...m, setlist: [...setlist, newSong] };
      }
      return m;
    });
    onUpdateEvent({ ...event, moments: updatedMoments });
  };

  const handleRemoveSongFromMoment = (momentId: string, songId: string) => {
    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId && m.setlist) {
        return { ...m, setlist: m.setlist.filter(s => s.id !== songId) };
      }
      return m;
    });
    onUpdateEvent({ ...event, moments: updatedMoments });
  };

  // Breakout questions addition
  const handleAddBreakoutQuestion = (momentId: string) => {
    const qText = prompt('Introduceți o nouă întrebare pentru grupurile mici:');
    if (!qText) return;

    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId) {
        const questions = m.breakoutQuestions || [];
        return { ...m, breakoutQuestions: [...questions, qText] };
      }
      return m;
    });
    onUpdateEvent({ ...event, moments: updatedMoments });
  };

  const handleRemoveBreakoutQuestion = (momentId: string, qIndex: number) => {
    const updatedMoments = event.moments.map(m => {
      if (m.id === momentId && m.breakoutQuestions) {
        const questions = [...m.breakoutQuestions];
        questions.splice(qIndex, 1);
        return { ...m, breakoutQuestions: questions };
      }
      return m;
    });
    onUpdateEvent({ ...event, moments: updatedMoments });
  };

  // Total duration calculation
  const totalEventMinutes = event.moments.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Event Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        {!isEditingHeader ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ● Program Publicat
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {totalEventMinutes} minute total
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  {event.title}
                </h1>
              </div>

              <button
                onClick={() => setIsEditingHeader(true)}
                className="px-4 py-2 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 rounded-xl transition-colors self-start sm:self-center"
              >
                Editează Detalii General
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                <CalendarIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Dată & Ora</span>
                  <span className="font-semibold text-white">{event.date || 'Nedefinită'} de la {event.startTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Locație</span>
                  <span className="font-semibold text-white">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Tema Serii</span>
                  <span className="font-semibold text-white italic truncate block max-w-[180px]">"{event.theme}"</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Pasaj Biblic</span>
                  <span className="font-semibold text-white">{event.biblePassage}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2">
              Editare Detalii Eveniment & Informații Cheie
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Titlul Evenimentului</label>
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Locația</label>
                <input
                  type="text"
                  value={headerLocation}
                  onChange={(e) => setHeaderLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Dată (YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={headerDate}
                  onChange={(e) => setHeaderDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Ora de Început (ex: 18:00)</label>
                <input
                  type="text"
                  value={headerStartTime}
                  onChange={(e) => setHeaderStartTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tema Serii</label>
                <input
                  type="text"
                  value={headerTheme}
                  onChange={(e) => setHeaderTheme(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Pasaj Biblic</label>
                <input
                  type="text"
                  value={headerPassage}
                  onChange={(e) => setHeaderPassage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingHeader(false)}
                className="px-3 py-1.5 text-xs rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Anulează
              </button>
              <button
                onClick={saveHeaderChanges}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm"
              >
                Salvează Modificările
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Rundown Moments Timeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Structură Cronologică pe Momente (Rundown)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Fiecare serviciu este împărțit pe timpi preciși. Modificarea duratei recalculează automat orarul!
          </p>
        </div>

        <button
          onClick={handleAddMoment}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Adaugă Moment</span>
        </button>
      </div>

      {/* List of Moments */}
      <div className="space-y-4">
        {event.moments.map((moment, index) => {
          const isExpanded = expandedMomentId === moment.id;

          // Department visual style helpers
          let deptColor = 'border-slate-800 bg-slate-900/80';
          let deptBadge = 'bg-slate-800 text-slate-300';
          let deptIcon = <Clock className="w-4 h-4 text-slate-400" />;

          if (moment.department === 'welcome') {
            deptColor = 'border-amber-500/30 bg-amber-950/20';
            deptBadge = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            deptIcon = <Users className="w-4 h-4 text-amber-400" />;
          } else if (moment.department === 'games') {
            deptColor = 'border-pink-500/30 bg-pink-950/20';
            deptBadge = 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
            deptIcon = <Gamepad2 className="w-4 h-4 text-pink-400" />;
          } else if (moment.department === 'music') {
            deptColor = 'border-indigo-500/30 bg-indigo-950/20';
            deptBadge = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
            deptIcon = <Music className="w-4 h-4 text-indigo-400" />;
          } else if (moment.department === 'ministry') {
            deptColor = 'border-purple-500/30 bg-purple-950/20';
            deptBadge = 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            deptIcon = <BookOpen className="w-4 h-4 text-purple-400" />;
          } else if (moment.department === 'tech') {
            deptColor = 'border-cyan-500/30 bg-cyan-950/20';
            deptBadge = 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
            deptIcon = <FileText className="w-4 h-4 text-cyan-400" />;
          }

          return (
            <div
              key={moment.id}
              className={`rounded-2xl border ${deptColor} transition-all duration-200 overflow-hidden shadow-lg`}
            >
              {/* Moment Summary Bar */}
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end min-w-[90px]">
                    <span className="font-mono text-xs font-bold text-indigo-300">
                      {moment.startTime} - {moment.endTime}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({moment.durationMinutes} min)
                    </span>
                  </div>

                  <div className="h-8 w-px bg-slate-800 hidden md:block"></div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      {deptIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-sm text-white">
                          {moment.title}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${deptBadge}`}>
                          {moment.department}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        Responsabil: {moment.responsiblePerson}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick actions & expand toggle */}
                <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                  <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 px-1 font-mono">Durată:</span>
                    <button
                      onClick={() => handleDurationChange(moment.id, moment.durationMinutes - 5)}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center text-xs font-bold"
                      title="-5 min"
                    >
                      -
                    </button>
                    <span className="px-1.5 text-xs font-mono font-bold text-white">
                      {moment.durationMinutes}m
                    </span>
                    <button
                      onClick={() => handleDurationChange(moment.id, moment.durationMinutes + 5)}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center text-xs font-bold"
                      title="+5 min"
                    >
                      +
                    </button>
                  </div>

                  {/* Reorder Buttons */}
                  <button
                    onClick={() => handleMoveMoment(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveMoment(index, 'down')}
                    disabled={index === event.moments.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteMoment(moment.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20"
                    title="Șterge Moment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setExpandedMomentId(isExpanded ? null : moment.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold border border-indigo-500/20"
                  >
                    <span>{isExpanded} Detalii</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed Editor View */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/60 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Titlu Moment</label>
                      <input
                        type="text"
                        value={moment.title}
                        onChange={(e) => handleUpdateMomentField(moment.id, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Responsabil (Persoană / Echipă)</label>
                      <input
                        type="text"
                        value={moment.responsiblePerson}
                        onChange={(e) => handleUpdateMomentField(moment.id, 'responsiblePerson', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Descriere & Instrucțiuni Detaliate</label>
                    <textarea
                      rows={2}
                      value={moment.details}
                      onChange={(e) => handleUpdateMomentField(moment.id, 'details', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Domain-specific Sub-Editors based on moment type */}
                  
                  {/* 1. Setlist sub-editor for Laudă și Închinare */}
                  {moment.title.toLowerCase().includes('laudă') || moment.department === 'music' ? (
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-xs text-indigo-300 flex items-center gap-2">
                          <Music className="w-4 h-4 text-indigo-400" />
                          <span>Lista de piese (Setlist Inchinare)</span>
                        </h4>
                        <button
                          onClick={() => handleAddSongToMoment(moment.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Adaugă Piesă</span>
                        </button>
                      </div>

                      {moment.setlist && moment.setlist.length > 0 ? (
                        <div className="space-y-2">
                          {moment.setlist.map((song, sIdx) => (
                            <div key={song.id} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                              <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center text-[10px]">
                                  {sIdx + 1}
                                </span>
                                <div>
                                  <span className="font-semibold text-white">{song.title}</span>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                                      Ton: {song.key}
                                    </span>
                                    {song.tempo && <span>{song.tempo}</span>}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleRemoveSongFromMoment(moment.id, song.id)}
                                className="text-slate-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">Nicio piesă adăugată în setlist încă.</p>
                      )}
                    </div>
                  ) : null}

                  {/* 2. Icebreaker / Game AI sub-editor */}
                  {moment.title.toLowerCase().includes('joc') || moment.department === 'games' ? (
                    <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-xs text-pink-300 flex items-center gap-2">
                            <Gamepad2 className="w-4 h-4 text-pink-400" />
                            <span>Detalii Joc & Rechizite Necesare</span>
                          </h4>
                          <p className="text-[11px] text-slate-400">Generați idei unice de jocuri cu inteligența artificială.</p>
                        </div>
                        <button
                          onClick={() => onTriggerAiModal('icebreaker', moment.id)}
                          className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 flex items-center gap-1.5 shadow-md"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Generare Joc</span>
                        </button>
                      </div>

                      {moment.activityType && (
                        <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                          <p><strong className="text-pink-400">Tip Activitate:</strong> {moment.activityType}</p>
                          {moment.materialsNeeded && moment.materialsNeeded.length > 0 && (
                            <div>
                              <strong className="text-slate-400 block mb-1">Rechizite & Materiale:</strong>
                              <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                                {moment.materialsNeeded.map((mat, mIdx) => (
                                  <li key={mIdx}>{mat}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* 3. Prayer direction sub-editor */}
                  {moment.title.toLowerCase().includes('rugăciune') ? (
                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
                      <h4 className="font-display font-bold text-xs text-purple-300 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-purple-400" />
                        <span>Direcție & Format Rugăciune</span>
                      </h4>
                      <input
                        type="text"
                        value={moment.prayerDirection || ''}
                        onChange={(e) => handleUpdateMomentField(moment.id, 'prayerDirection', e.target.value)}
                        placeholder="ex: Rugăciune pe perechi pentru licee și universități..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ) : null}

                  {/* 4. Sermon & AI outline sub-editor */}
                  {moment.title.toLowerCase().includes('mesaj') || moment.title.toLowerCase().includes('predică') ? (
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-xs text-emerald-300 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-400" />
                            <span>Schiță Mesaj Biblic</span>
                          </h4>
                          <p className="text-[11px] text-slate-400">Generați o schiță de predică practică cu idei cheie.</p>
                        </div>
                        <button
                          onClick={() => onTriggerAiModal('sermon', moment.id)}
                          className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 flex items-center gap-1.5 shadow-md"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Schiță Predică</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Nume Vorbitor</label>
                          <input
                            type="text"
                            value={moment.speakerName || ''}
                            onChange={(e) => handleUpdateMomentField(moment.id, 'speakerName', e.target.value)}
                            placeholder="ex: Alex Todorescu"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Pasaj Biblic</label>
                          <input
                            type="text"
                            value={moment.biblePassage || ''}
                            onChange={(e) => handleUpdateMomentField(moment.id, 'biblePassage', e.target.value)}
                            placeholder="ex: Efeseni 2:1-10"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* 5. Breakout Groups sub-editor with AI Generator */}
                  {moment.title.toLowerCase().includes('grup') || moment.title.toLowerCase().includes('discuții') ? (
                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-xs text-purple-300 flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>Ghid Discuție în Grupuri Mici (3-4 Întrebări)</span>
                          </h4>
                          <p className="text-[11px] text-slate-400">Accesibil direct pe telefonul mobil al fiecărui lider de grup.</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onTriggerAiModal('breakout', moment.id)}
                            className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 flex items-center gap-1.5 shadow-md"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AI Întrebări</span>
                          </button>
                          <button
                            onClick={() => handleAddBreakoutQuestion(moment.id)}
                            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adaugă Manual</span>
                          </button>
                        </div>
                      </div>

                      {moment.breakoutQuestions && moment.breakoutQuestions.length > 0 ? (
                        <div className="space-y-2">
                          {moment.breakoutQuestions.map((q, qIdx) => (
                            <div key={qIdx} className="flex items-start justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                  {qIdx + 1}
                                </span>
                                <p className="text-slate-200">{q}</p>
                              </div>
                              <button
                                onClick={() => handleRemoveBreakoutQuestion(moment.id, qIdx)}
                                className="text-slate-500 hover:text-rose-400 p-1 shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">Nicio întrebare adăugată pentru grupurile mici încă.</p>
                      )}
                    </div>
                  ) : null}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
