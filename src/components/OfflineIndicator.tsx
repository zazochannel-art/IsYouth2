import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-500 text-slate-950 px-3.5 py-2 text-xs font-bold shadow-2xl border border-amber-300/40 animate-bounce">
      <WifiOff className="w-4 h-4 stroke-[2.5]" />
      <span>Mod Offline — Se folosesc datele salvate local.</span>
    </div>
  );
};
