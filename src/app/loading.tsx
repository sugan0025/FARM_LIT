import React from 'react';
import { Sprout } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-farm-100 text-farm-800 flex items-center justify-center animate-bounce shadow-sm">
        <Sprout className="w-7 h-7 text-farm-700" />
      </div>
      <p className="text-xs font-bold text-farm-900 tracking-wider uppercase animate-pulse">
        Harvesting fresh produce details...
      </p>
    </div>
  );
}
