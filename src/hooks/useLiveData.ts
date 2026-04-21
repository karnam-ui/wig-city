import { useState, useEffect } from 'react';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export interface LiveDashboardData {
  tonnesCollected: number;
  activeTrucks: number;
  divertedPercent: number;
  recoveryValueLakhs: number;
}

export function useLiveData(): LiveDashboardData {
  const [data, setData] = useState<LiveDashboardData>({
    tonnesCollected: 3847,
    activeTrucks: 1243,
    divertedPercent: 67,
    recoveryValueLakhs: 124,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        tonnesCollected: clamp(prev.tonnesCollected + rand(-15, 25), 3700, 4200),
        activeTrucks: clamp(prev.activeTrucks + rand(-3, 3), 1200, 1280),
        divertedPercent: clamp(prev.divertedPercent + (Math.random() - 0.4) * 0.5, 64, 70),
        recoveryValueLakhs: clamp(prev.recoveryValueLakhs + rand(-2, 2), 118, 132),
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
