import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const stationNames = ['TS-1 Secunderabad', 'TS-2 Kukatpally', 'TS-3 LB Nagar', 'TS-4 Uppal', 'TS-5 Mehdipatnam', 'TS-6 Gachibowli'];
const routeOptions = [
  { label: 'Compost Plant', color: 'bg-primary text-primary-foreground' },
  { label: 'MRF Nacharam', color: 'bg-chart-2 text-foreground' },
  { label: 'C&D Plant', color: 'bg-amber text-amber-foreground' },
  { label: 'Landfill', color: 'bg-muted text-muted-foreground' },
];

function randomFeed() {
  const st = stationNames[Math.floor(Math.random() * stationNames.length)];
  const truck = `GHM-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const time = new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const route = routeOptions[Math.floor(Math.random() * routeOptions.length)];
  const organic = 40 + Math.floor(Math.random() * 30);
  const recyclable = 10 + Math.floor(Math.random() * 25);
  const inert = 5 + Math.floor(Math.random() * 15);
  const hazardous = Math.max(0, 100 - organic - recyclable - inert);
  const recovery = 800 + Math.floor(Math.random() * 500);
  const net = 2000 + Math.floor(Math.random() * 4000);
  return { st, truck, time, route, organic, recyclable, inert, hazardous, recovery, net };
}

export function TransferFeed() {
  const [items, setItems] = useState(() => Array.from({ length: 4 }, randomFeed));

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => [randomFeed(), ...prev.slice(0, 5)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-3 glow-card">
      <h3 className="text-xs text-muted-foreground mb-2">TRANSFER STATION LIVE FEED</h3>
      <div className="space-y-2 max-h-52 overflow-y-auto">
        {items.map((item, i) => (
          <div key={`${item.truck}-${item.time}-${i}`} className="bg-surface rounded-md p-2 text-xs animate-fade-in">
            <div className="flex items-center justify-between mb-1">
              <span className="text-foreground font-medium">{item.st} · <span className="font-data">{item.truck}</span> · <span className="font-data">{item.time}</span></span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden mb-1.5">
              <div className="bg-primary" style={{ width: `${item.organic}%` }} />
              <div className="bg-chart-2" style={{ width: `${item.recyclable}%` }} />
              <div className="bg-muted-foreground" style={{ width: `${item.inert}%` }} />
              <div className="bg-danger" style={{ width: `${item.hazardous}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${item.route.color}`}>
                <ArrowRight size={8} /> {item.route.label}
              </span>
              <span className="text-muted-foreground font-data text-[10px]">
                Recovery ₹{item.recovery}/t · Net ₹{item.net}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
