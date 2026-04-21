import { useState } from 'react';

const wards = [
  { name: 'Uppal', tonnes: 721 },
  { name: 'LB Ngr', tonnes: 698 },
  { name: 'Sec-bad', tonnes: 589 },
  { name: 'K-pally', tonnes: 847 },
  { name: 'M-patnam', tonnes: 634 },
  { name: '', tonnes: 412 }, { name: '', tonnes: 523 }, { name: '', tonnes: 378 },
  { name: '', tonnes: 456 }, { name: '', tonnes: 290 }, { name: '', tonnes: 567 },
  { name: '', tonnes: 345 }, { name: '', tonnes: 623 }, { name: '', tonnes: 489 },
  { name: '', tonnes: 312 }, { name: '', tonnes: 534 }, { name: '', tonnes: 267 },
  { name: '', tonnes: 445 }, { name: '', tonnes: 398 }, { name: '', tonnes: 501 },
  { name: '', tonnes: 356 }, { name: '', tonnes: 478 }, { name: '', tonnes: 289 },
  { name: '', tonnes: 567 }, { name: '', tonnes: 423 }, { name: '', tonnes: 334 },
  { name: '', tonnes: 512 }, { name: '', tonnes: 445 }, { name: '', tonnes: 378 },
  { name: '', tonnes: 601 },
];

function getColor(tonnes: number) {
  const ratio = Math.min(tonnes / 850, 1);
  if (ratio < 0.3) return 'bg-[oklch(0.25_0.06_145)]';
  if (ratio < 0.5) return 'bg-[oklch(0.35_0.08_140)]';
  if (ratio < 0.7) return 'bg-[oklch(0.50_0.12_100)]';
  if (ratio < 0.85) return 'bg-[oklch(0.60_0.16_60)]';
  return 'bg-[oklch(0.55_0.20_25)]';
}

export function WardHeatmap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-card border border-border rounded-lg p-3 glow-card">
      <h3 className="text-xs text-muted-foreground mb-2">WARD HEATMAP</h3>
      <div className="grid grid-cols-6 gap-1 relative">
        {wards.map((w, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm ${getColor(w.tonnes)} cursor-pointer transition-all hover:ring-1 hover:ring-primary relative`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {w.name && <span className="absolute inset-0 flex items-center justify-center text-[6px] text-foreground/80 font-data">{w.name}</span>}
            {hovered === i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-[10px] whitespace-nowrap z-10 font-data">
                {w.name || `Ward ${i + 1}`}: {w.tonnes}t today
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
