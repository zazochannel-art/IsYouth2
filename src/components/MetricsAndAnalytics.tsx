import React, { useState } from 'react';
import { YouthEvent, PostEventMetrics, PrayerBankEntry } from '../types';
import { 
  BarChart3, Users, UserPlus, CheckCircle2, Heart, BookOpen, 
  ThumbsUp, ThumbsDown, Lightbulb, Plus, Trash2, Save, Calendar
} from 'lucide-react';

interface MetricsAndAnalyticsProps {
  event: YouthEvent;
  onUpdateEvent: (updated: YouthEvent) => void;
  prayerBank: PrayerBankEntry[];
  onAddPrayerEntry: (content: string, eventTitle: string) => void;
  onDeletePrayerEntry: (id: string) => void;
}

export const MetricsAndAnalytics: React.FC<MetricsAndAnalyticsProps> = ({
  event,
  onUpdateEvent,
  prayerBank,
  onAddPrayerEntry,
  onDeletePrayerEntry
}) => {
  const [metrics, setMetrics] = useState<PostEventMetrics>(event.metrics);
  const [newPrayerText, setNewPrayerText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdateField = (field: keyof PostEventMetrics, value: any) => {
    const updatedMetrics = { ...metrics, [field]: value };
    setMetrics(updatedMetrics);
    onUpdateEvent({ ...event, metrics: updatedMetrics });
  };

  const handleSaveMetrics = () => {
    onUpdateEvent({ ...event, metrics });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddCustomPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerText.trim()) return;

    onAddPrayerEntry(newPrayerText.trim(), event.title);
    setNewPrayerText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <span>Indicatori Măsurabili Post-Eveniment (Metrics & Analytics)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Măsurarea prezenței, evaluarea calitativă a liderilor și centralizarea băncii de motive de rugăciune.
          </p>
        </div>

        <button
          onClick={handleSaveMetrics}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-center"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Salvat cu Succes!' : 'Salvează Evaluarea'}</span>
        </button>
      </div>

      {/* Quantitative Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Prezență Totală</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              value={metrics.totalAttendance}
              onChange={(e) => handleUpdateField('totalAttendance', Number(e.target.value))}
              className="w-24 bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-2xl font-bold text-white focus:outline-none focus:border-indigo-500"
            />
            <span className="text-xs text-slate-400">tineri & participanți</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Oaspeți Noi (Prima Dată)</span>
            <UserPlus className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              value={metrics.firstTimeVisitors}
              onChange={(e) => handleUpdateField('firstTimeVisitors', Number(e.target.value))}
              className="w-24 bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-2xl font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-xs text-slate-400">persoane noi</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Echipă & Voluntari Implicați</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              value={metrics.volunteersInvolved}
              onChange={(e) => handleUpdateField('volunteersInvolved', Number(e.target.value))}
              className="w-20 bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-2xl font-bold text-white focus:outline-none focus:border-purple-500"
            />
            <span className="text-xs text-slate-500 font-bold">vs</span>
            <input
              type="number"
              value={metrics.volunteersNeeded}
              onChange={(e) => handleUpdateField('volunteersNeeded', Number(e.target.value))}
              className="w-20 bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-xl font-bold text-slate-400 focus:outline-none focus:border-purple-500"
            />
            <span className="text-xs text-slate-400">necesar</span>
          </div>
        </div>
      </div>

      {/* Qualitative Indicators & Leader Evaluation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Leader Evaluation (Evaluare Lideri - Pro & Contra / Lecții Învățate) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Fișă Evaluare Lideri (Pro & Contra / Lecții)</span>
            </h3>
            <p className="text-xs text-slate-400">Feedback calitativ după încheierea serviciului.</p>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={metrics.objectivesMet}
              onChange={(e) => handleUpdateField('objectivesMet', e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0 w-4 h-4"
            />
            <span className="text-xs font-semibold text-white">
              Obiectivele duhovnicești și organizatorice ale serii au fost îndeplinite
            </span>
          </label>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" />
                <span>Pro / Ce a mers foarte bine:</span>
              </label>
              <textarea
                rows={3}
                value={metrics.proNotes}
                onChange={(e) => handleUpdateField('proNotes', e.target.value)}
                placeholder="ex: Atmosferă caldă la închinare, tinerii au interacționat grozav la joc..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-rose-400 font-bold mb-1 flex items-center gap-1.5">
                <ThumbsDown className="w-4 h-4" />
                <span>Contra / Ce trebuie îmbunătățit:</span>
              </label>
              <textarea
                rows={3}
                value={metrics.contraNotes}
                onChange={(e) => handleUpdateField('contraNotes', e.target.value)}
                placeholder="ex: Sunetul a avut un mic microfonaj, ceaiul s-a terminat prea devreme..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Lecții Învățate pentru data viitoare:</span>
              </label>
              <textarea
                rows={2}
                value={metrics.lessonsLearned}
                onChange={(e) => handleUpdateField('lessonsLearned', e.target.value)}
                placeholder="ex: Începem probele de sunet cu 15 minute mai devreme..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Banca de Motive de Rugăciune (Central Prayer Request Bank) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-400" />
              <span>Banca de Motive de Rugăciune</span>
            </h3>
            <p className="text-xs text-slate-400">
              Colectarea și salvarea cererilor de rugăciune exprimate pentru urmărire ulterioară.
            </p>
          </div>

          <form onSubmit={handleAddCustomPrayer} className="flex gap-2 text-xs">
            <input
              type="text"
              value={newPrayerText}
              onChange={(e) => setNewPrayerText(e.target.value)}
              placeholder="Adaugă o nouă cerere de rugăciune..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shrink-0 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Adaugă</span>
            </button>
          </form>

          {prayerBank.length > 0 ? (
            <div className="space-y-3">
              {prayerBank.map(entry => (
                <div key={entry.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-200">"{entry.content}"</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-600" />
                        {entry.dateAdded}
                      </span>
                      <span>— {entry.eventTitle}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeletePrayerEntry(entry.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 shrink-0"
                    title="Șterge motiv"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Nicio cerere de rugăciune înregistrată în Banca centrală de rugăciune încă.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
