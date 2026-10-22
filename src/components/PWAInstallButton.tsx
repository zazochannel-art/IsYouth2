import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-3 py-1.5 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
        title="Instalează aplicația YouthFlow pe telefon sau calculator"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Instalează Aplicația</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold shadow-sm transition cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Instalează pe iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative text-slate-100">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Instalare pe iPhone / iPad</h3>
                  <p className="text-xs text-slate-400">Adaugă YouthFlow pe ecranul principal</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                  <p>Apasă butonul <strong className="text-white inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-indigo-400" /> Partajare (Share)</strong> din bara Safari.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                  <p>Derulează în jos și selectează <strong className="text-white">Adăugare la ecranul principal (Add to Home Screen)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                  <p>Apasă <strong className="text-white">Adăugare</strong> în colțul din dreapta sus.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-md transition"
              >
                Am înțeles
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback indicator when prompt hasn't triggered or on desktop browser
  return (
    <button
      onClick={() => {
        alert('Pentru a instala aplicația:\n• Pe Android / Chrome: Apasă pe Meniu (⋮) -> "Adăugare pe ecranul de pornire" sau "Instalează aplicația".\n• Pe iOS / Safari: Apasă pe butonul Partajare -> "Adăugare la ecranul principal".');
      }}
      className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 text-xs font-medium transition cursor-pointer"
      title="Instrucțiuni instalare PWA"
    >
      <Download className="w-3.5 h-3.5 text-amber-400" />
      <span className="hidden sm:inline">Instalează App</span>
      <span className="sm:hidden">Instalează</span>
    </button>
  );
};
