import React, { useState, useEffect } from 'react';
import { YouthEvent, LiveQuestion, PreEventCheckitem } from '../types';
import { 
  Radio, CheckSquare, MessageSquare, ThumbsUp, CheckCircle, 
  Clock, QrCode, Smartphone, Sparkles, Send, BookOpen, Music, Shield,
  Plus, Bookmark, Heart, RefreshCw, Eye
} from 'lucide-react';

interface LiveEventViewProps {
  event: YouthEvent;
  onUpdateEvent: (updated: YouthEvent) => void;
  onSaveToPrayerBank: (motive: string) => void;
}

export const LiveEventView: React.FC<LiveEventViewProps> = ({
  event,
  onUpdateEvent,
  onSaveToPrayerBank
}) => {
  const [viewMode, setViewMode] = useState<'host' | 'mobile_preview'>('host');
  const [activeFilter, setActiveFilter] = useState<'all' | 'questions' | 'prayers'>('all');

  // New question form state
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<'question' | 'prayer_request'>('question');
  const [newAlias, setNewAlias] = useState('');

  // Pre-event checklist toggle
  const handleToggleCheckitem = (itemId: string) => {
    const updatedChecklist = event.preChecklist.map(ck => {
      if (ck.id === itemId) {
        return { ...ck, completed: !ck.completed };
      }
      return ck;
    });
    onUpdateEvent({ ...event, preChecklist: updatedChecklist });
  };

  const handleAddCheckitem = () => {
    const text = prompt('Introduceți un nou punct pe lista de verificare pre-eveniment:');
    if (!text) return;

    const newItem: PreEventCheckitem = {
      id: `ck-${Date.now()}`,
      title: text,
      completed: false,
      department: 'general'
    };

    onUpdateEvent({ ...event, preChecklist: [...event.preChecklist, newItem] });
  };

  // Upvote question
  const handleUpvote = (qId: string) => {
    const updatedQuestions = event.liveQuestions.map(q => {
      if (q.id === qId) {
        return { ...q, upvotes: q.upvotes + 1 };
      }
      return q;
    });
    onUpdateEvent({ ...event, liveQuestions: updatedQuestions });
  };

  // Mark answered
  const handleToggleAnswered = (qId: string) => {
    const updatedQuestions = event.liveQuestions.map(q => {
      if (q.id === qId) {
        return { ...q, isAnswered: !q.isAnswered };
      }
      return q;
    });
    onUpdateEvent({ ...event, liveQuestions: updatedQuestions });
  };

  // Save to prayer bank
  const handleBookmarkPrayer = (q: LiveQuestion) => {
    onSaveToPrayerBank(q.content);
    const updatedQuestions = event.liveQuestions.map(item => {
      if (item.id === q.id) {
        return { ...item, isBookmarked: true };
      }
      return item;
    });
    onUpdateEvent({ ...event, liveQuestions: updatedQuestions });
  };

  // Add question / prayer request from participant UI
  const handleSubmitParticipantQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newQ: LiveQuestion = {
      id: `q-${Date.now()}`,
      type: newType,
      content: newContent.trim(),
      authorAlias: newAlias.trim() || 'Anonim',
      timestamp: timeStr,
      upvotes: 1,
      isAnswered: false,
      isBookmarked: false
    };

    onUpdateEvent({ ...event, liveQuestions: [newQ, ...event.liveQuestions] });
    setNewContent('');
    setNewAlias('');
  };

  // Filter questions
  const filteredQuestions = event.liveQuestions.filter(q => {
    if (activeFilter === 'questions') return q.type === 'question';
    if (activeFilter === 'prayers') return q.type === 'prayer_request';
    return true;
  });

  // Checklist completion stats
  const completedChecklistCount = event.preChecklist.filter(c => c.completed).length;
  const totalChecklistCount = event.preChecklist.length;
  const checklistPercent = totalChecklistCount > 0 ? Math.round((completedChecklistCount / totalChecklistCount) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* View Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-xl font-display font-extrabold text-white">Unelte de Interacțiune În Timpul Serii</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Q&A anonim & motive de rugăciune în timp real + checklist de pregătire pre-eveniment.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('host')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'host'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Panou Lider / Vorbitor</span>
          </button>

          <button
            onClick={() => setViewMode('mobile_preview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'mobile_preview'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulare Telefon Tineri</span>
          </button>
        </div>
      </div>

      {/* Host / Speaker Mode */}
      {viewMode === 'host' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Pre-Event Checklist (Checklist Pregătire) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    <span>Checklist Pregătire (Pre-Eveniment)</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Verificare rapidă înainte de începere</p>
                </div>
                <button
                  onClick={handleAddCheckitem}
                  className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-xs"
                  title="Adaugă punct"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-semibold">
                  <span className="text-slate-400">Progres Pregătiri:</span>
                  <span className="text-emerald-400">{completedChecklistCount} / {totalChecklistCount} ({checklistPercent}%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                    style={{ width: `${checklistPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Checkbox items */}
              <div className="space-y-2">
                {event.preChecklist.map(item => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      item.completed
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-300'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleCheckitem(item.id)}
                      className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4"
                    />
                    <span className={item.completed ? 'line-through text-slate-500' : ''}>
                      {item.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* QR Code Card for Audience */}
            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-center shadow-xl">
              <div className="flex items-center justify-center gap-2 text-indigo-400 font-display font-bold text-sm">
                <QrCode className="w-5 h-5" />
                <span>Cod Conectare Tineri</span>
              </div>
              <p className="text-xs text-slate-400">
                Afișați pe proiector pentru ca tinerii să trimită întrebări anonime și motive de rugăciune!
              </p>

              {/* Simulated stylized QR box */}
              <div className="w-40 h-40 mx-auto bg-white p-3 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                <div className="grid grid-cols-4 gap-2 w-full h-full opacity-90">
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-indigo-600 rounded"></div>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Cod Săli de Tineret</span>
                <span className="font-mono text-base font-extrabold text-indigo-300 tracking-wider">#TINERET-BETEL</span>
              </div>
            </div>
          </div>

          {/* Right Column (2 cols wide): Live Q&A and Anonymous Prayer Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                    <span>Flux Live Q&A & Motive de Rugăciune Anonime</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sosesc în timp real de pe telefoanele tinerilor. Vizibil direct de către predicator sau vorbitor.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-center">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Toate ({event.liveQuestions.length})
                  </button>

                  <button
                    onClick={() => setActiveFilter('questions')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Întrebări Mesaj
                  </button>

                  <button
                    onClick={() => setActiveFilter('prayers')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'prayers' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Rugăciune
                  </button>
                </div>
              </div>

              {/* Questions Stream List */}
              {filteredQuestions.length > 0 ? (
                <div className="space-y-3">
                  {filteredQuestions.map(q => {
                    const isPrayer = q.type === 'prayer_request';

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border transition-all ${
                          q.isAnswered
                            ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                            : isPrayer
                            ? 'bg-purple-950/20 border-purple-500/30'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                isPrayer ? 'bg-purple-500/20 text-purple-300' : 'bg-indigo-500/20 text-indigo-300'
                              }`}>
                                {isPrayer ? 'Motiv Rugăciune' : 'Întrebare Mesaj'}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">— {q.authorAlias}</span>
                              <span className="text-[10px] text-slate-500 font-mono">la {q.timestamp}</span>
                            </div>

                            <p className="text-sm font-medium text-white pt-1">
                              "{q.content}"
                            </p>
                          </div>

                          {/* Upvotes badge */}
                          <button
                            onClick={() => handleUpvote(q.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 shrink-0"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{q.upvotes}</span>
                          </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/60 text-xs">
                          <button
                            onClick={() => handleToggleAnswered(q.id)}
                            className={`flex items-center gap-1.5 font-semibold ${
                              q.isAnswered ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>{q.isAnswered ? 'Răspuns / Adresat' : 'Marchează Răspuns'}</span>
                          </button>

                          {isPrayer && (
                            <button
                              onClick={() => handleBookmarkPrayer(q)}
                              disabled={q.isBookmarked}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                q.isBookmarked
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-slate-900 text-purple-400 border border-slate-800 hover:bg-purple-950/40'
                              }`}
                            >
                              <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                              <span>{q.isBookmarked ? 'Salvat în Banca de Rugăciune' : 'Salvează în Bancă'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                  Nicio întrebare primită în acest filtru încă. Trimiteți o întrebare de pe telefonul mobil!
                </div>
              )}

            </div>
          </div>

        </div>
      ) : (
        /* Mobile Preview Mode (Simulare Telefon Tineri) */
        <div className="max-w-sm mx-auto bg-slate-950 border-4 border-slate-800 rounded-[3rem] p-4 shadow-2xl space-y-4">
          {/* Phone Screen Mockup */}
          <div className="bg-slate-900 rounded-[2rem] p-4 border border-slate-800 space-y-4">
            
            <div className="text-center space-y-1 border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Tineret Betel Live</span>
              <h3 className="font-display font-extrabold text-sm text-white">{event.title}</h3>
              <p className="text-[11px] text-slate-400 italic">"{event.theme}"</p>
            </div>

            {/* Breakout Questions Guide section for youth leaders */}
            <div className="bg-purple-950/30 border border-purple-500/30 p-3 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-purple-300 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Ghid Discuție Grup Mic
              </span>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                {event.moments.find(m => m.breakoutQuestions)?.breakoutQuestions?.map((q, idx) => (
                  <li key={idx} className="line-clamp-2">{q}</li>
                )) || <li>Ghidul de discuție va fi afișat după mesaj.</li>}
              </ul>
            </div>

            {/* Form to submit anonymous question */}
            <form onSubmit={handleSubmitParticipantQuestion} className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                <span>Trimite o Întrebare sau Motiv Anonim</span>
              </h4>

              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setNewType('question')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold border ${
                    newType === 'question'
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Întrebare Mesaj
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('prayer_request')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold border ${
                    newType === 'prayer_request'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Motiv Rugăciune
                </button>
              </div>

              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder={newType === 'question' ? 'Ce întrebare ai legat de mesaj?' : 'Ce motiv de rugăciune ai?'}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />

              <input
                type="text"
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                placeholder="Pseudonim (opțional, ex: Anonim 17)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-md"
              >
                Trimite Anonim
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
