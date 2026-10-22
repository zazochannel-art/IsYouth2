import React, { useState } from 'react';
import { YouthEvent } from '../types';
import { formatEventForWhatsApp } from '../utils/exportUtils';
import { Share2, Copy, Check, ExternalLink, X } from 'lucide-react';

interface WhatsAppExportModalProps {
  event: YouthEvent;
  onClose: () => void;
}

export const WhatsAppExportModal: React.FC<WhatsAppExportModalProps> = ({
  event,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const formattedText = formatEventForWhatsApp(event);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(formattedText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Export Rapid Program (WhatsApp / Telegram)</h3>
              <p className="text-xs text-slate-400">Rezumat vizual pregătit pentru trimitere instantă pe grupul echipei.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Textbox preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed selection:bg-emerald-500 selection:text-white">
          {formattedText}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiat în Clipboard!' : 'Copiază Text'}</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Deschide în WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
