import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X, BookOpen, Gamepad2, Users } from 'lucide-react';

interface AiGeneratorModalProps {
  type: 'breakout' | 'icebreaker' | 'sermon';
  momentId: string;
  topic: string;
  biblePassage: string;
  onApplyResult: (type: 'breakout' | 'icebreaker' | 'sermon', momentId: string, resultData: any) => void;
  onClose: () => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  type,
  momentId,
  topic: initialTopic,
  biblePassage: initialPassage,
  onApplyResult,
  onClose
}) => {
  const [topic, setTopic] = useState(initialTopic || 'Identitate și Credință în Hristos');
  const [biblePassage, setBiblePassage] = useState(initialPassage || 'Efeseni 2:1-10');
  const [gameType, setGameType] = useState('Icebreaker & Trivia Interactiv');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<any | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedData(null);

    try {
      let endpoint = '/api/ai/generate-breakout';
      let payload = {};

      if (type === 'breakout') {
        endpoint = '/api/ai/generate-breakout';
        payload = { topic, biblePassage };
      } else if (type === 'icebreaker') {
        endpoint = '/api/ai/generate-icebreaker';
        payload = { gameType, durationMinutes: 15, groupSize: '30-50 tineri' };
      } else if (type === 'sermon') {
        endpoint = '/api/ai/generate-sermon-outline';
        payload = { topic, biblePassage };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Eroare la apelul AI.');
      }

      const data = await res.json();
      setGeneratedData(data);
    } catch (err: any) {
      setError(err.message || 'Eroare la generarea conținutului.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedData) return;
    onApplyResult(type, momentId, generatedData);
    onClose();
  };

  let title = 'Generare Asistent AI';
  let icon = <Sparkles className="w-5 h-5 text-indigo-400" />;

  if (type === 'breakout') {
    title = 'Asistent AI: Întrebări Grupe Mici (Breakout)';
    icon = <Users className="w-5 h-5 text-purple-400" />;
  } else if (type === 'icebreaker') {
    title = 'Asistent AI: Joc de Tineret / Icebreaker';
    icon = <Gamepad2 className="w-5 h-5 text-pink-400" />;
  } else if (type === 'sermon') {
    title = 'Asistent AI: Schiță Mesaj Biblic';
    icon = <BookOpen className="w-5 h-5 text-emerald-400" />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              {icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">{title}</h3>
              <p className="text-[11px] text-slate-400">Generat inteligent cu Google Gemini API</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Parameters */}
        <div className="space-y-3 text-xs">
          {type !== 'icebreaker' ? (
            <>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tema Serii</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Pasaj Biblic</label>
                <input
                  type="text"
                  value={biblePassage}
                  onChange={(e) => setBiblePassage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Stil Joc / Activitate</label>
              <input
                type="text"
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                placeholder="ex: Icebreaker, Joc de echipă, Trivia"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Se generează...' : 'Generează Acum'}</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Results Preview */}
        {generatedData && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-xs text-white">Rezultat Generat:</h4>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 max-h-52 overflow-y-auto space-y-2">
              {type === 'breakout' && generatedData.questions && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {generatedData.questions.map((q: string, idx: number) => (
                    <li key={idx} className="text-purple-200 font-medium">{q}</li>
                  ))}
                </ul>
              )}

              {type === 'icebreaker' && (
                <div className="space-y-2">
                  <p className="font-bold text-pink-300 text-sm">{generatedData.title}</p>
                  <div>
                    <strong className="text-slate-400">Reguli:</strong>
                    <ul className="list-disc list-inside space-y-0.5">
                      {generatedData.rules?.map((r: string, idx: number) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-slate-400">Materiale:</strong> {generatedData.materialsNeeded?.join(', ')}
                  </div>
                </div>
              )}

              {type === 'sermon' && (
                <div className="space-y-2">
                  <p className="font-bold text-emerald-300 text-sm">{generatedData.title}</p>
                  <p className="italic text-slate-400">{generatedData.keyVerse}</p>
                  <div>
                    <strong className="text-slate-400 block">Puncte Cheie:</strong>
                    <ul className="list-disc list-inside space-y-1">
                      {generatedData.mainPoints?.map((p: any, idx: number) => (
                        <li key={idx}><strong>{p.point}:</strong> {p.explanation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Anulează
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Aplică în Program</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
