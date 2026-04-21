import { Leaf, Recycle, Flame, Building, Truck } from 'lucide-react';

const trucks = [
  { id: 'GHM-1847', x: 25, y: 30, status: 'moving' as const },
  { id: 'GHM-2103', x: 45, y: 55, status: 'moving' as const },
  { id: 'GHM-1592', x: 65, y: 25, status: 'moving' as const },
  { id: 'GHM-0934', x: 15, y: 60, status: 'moving' as const },
  { id: 'GHM-2271', x: 80, y: 40, status: 'moving' as const },
  { id: 'GHM-1123', x: 35, y: 75, status: 'moving' as const },
  { id: 'GHM-0756', x: 55, y: 15, status: 'moving' as const },
  { id: 'GHM-1688', x: 70, y: 65, status: 'moving' as const },
  { id: 'GHM-2045', x: 40, y: 45, status: 'moving' as const },
  { id: 'GHM-1390', x: 50, y: 70, status: 'idle' as const },
  { id: 'GHM-0812', x: 20, y: 40, status: 'idle' as const },
  { id: 'GHM-1955', x: 60, y: 50, status: 'overloaded' as const },
];

const stations = [
  { id: 'TS-1', x: 30, y: 20, capacity: 45 },
  { id: 'TS-2', x: 70, y: 30, capacity: 52 },
  { id: 'TS-3', x: 50, y: 50, capacity: 89 },
  { id: 'TS-4', x: 20, y: 70, capacity: 40 },
  { id: 'TS-5', x: 75, y: 60, capacity: 61 },
  { id: 'TS-6', x: 45, y: 35, capacity: 65 },
];

const facilities = [
  { name: 'Compost Plant', sub: 'Jawahar Nagar', icon: Leaf, x: 10, y: 10 },
  { name: 'MRF', sub: 'Nacharam', icon: Recycle, x: 88, y: 12 },
  { name: 'Biogas Plant', sub: 'Dundigal', icon: Flame, x: 85, y: 82 },
  { name: 'C&D Plant', sub: 'Medchal', icon: Building, x: 12, y: 85 },
];

const routes = [
  { from: { x: 25, y: 30 }, to: { x: 10, y: 10 } },
  { from: { x: 45, y: 55 }, to: { x: 88, y: 12 } },
  { from: { x: 65, y: 25 }, to: { x: 85, y: 82 } },
];

export function CityMap({ onTruckClick }: { onTruckClick: (id: string) => void }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 glow-card">
      <h3 className="text-xs text-muted-foreground mb-2">CITY MAP — HYDERABAD</h3>
      <div className="relative w-full aspect-[16/10] bg-background rounded-md overflow-hidden border border-border">
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10%" height="10%" patternUnits="objectBoundingBox">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="oklch(0.25 0.03 140)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Routes */}
          {routes.map((r, i) => (
            <line
              key={i}
              x1={`${r.from.x}%`} y1={`${r.from.y}%`}
              x2={`${r.to.x}%`} y2={`${r.to.y}%`}
              stroke="oklch(0.72 0.19 145 / 0.3)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="animate-dash"
            />
          ))}
        </svg>

        {/* Transfer Stations */}
        {stations.map(s => (
          <div key={s.id} className="absolute flex flex-col items-center" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}>
            <div className={`w-5 h-5 rotate-45 border-2 flex items-center justify-center text-[6px] font-data ${s.capacity > 80 ? 'border-danger bg-danger/20' : 'border-primary/60 bg-primary/10'}`}>
              <span className="-rotate-45">{s.id.split('-')[1]}</span>
            </div>
            <div className="mt-0.5 w-8 h-1 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.capacity > 80 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${s.capacity}%` }} />
            </div>
            <span className="text-[7px] text-muted-foreground font-data">{s.id}</span>
          </div>
        ))}

        {/* Facilities */}
        {facilities.map(f => (
          <div key={f.name} className="absolute flex flex-col items-center" style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}>
            <div className="w-6 h-6 rounded-md bg-accent border border-border flex items-center justify-center">
              <f.icon size={12} className="text-primary" />
            </div>
            <span className="text-[6px] text-muted-foreground mt-0.5 whitespace-nowrap">{f.sub}</span>
          </div>
        ))}

        {/* Trucks */}
        {trucks.map(t => (
          <button
            key={t.id}
            onClick={() => onTruckClick(t.id)}
            className="absolute cursor-pointer group"
            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <Truck
              size={14}
              className={`transition-colors ${
                t.status === 'moving' ? 'text-primary' :
                t.status === 'idle' ? 'text-amber' : 'text-danger'
              }`}
            />
            {t.status === 'idle' && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] text-amber font-data whitespace-nowrap">IDLE 23min</span>}
            {t.status === 'overloaded' && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] text-danger font-data blink">OVERLOADED</span>}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[6px] text-muted-foreground font-data opacity-0 group-hover:opacity-100 whitespace-nowrap">{t.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
