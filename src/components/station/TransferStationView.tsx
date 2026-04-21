import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LiveClock } from '@/components/LiveClock';
import { CheckCircle2, XCircle, Loader2, Play } from 'lucide-react';

const facilities = ['COMPOST PLANT', 'MRF NACHARAM', 'BIOGAS PLANT', 'C&D PLANT'];
const facilityDetails: Record<string, { name: string; dist: string; fuel: number }> = {
  'COMPOST PLANT': { name: 'Jawahar Nagar Composting Facility', dist: '12.4 km', fuel: 340 },
  'MRF NACHARAM': { name: 'MRF Nacharam Sorting Facility', dist: '8.7 km', fuel: 240 },
  'BIOGAS PLANT': { name: 'Dundigal Biogas Facility', dist: '22.1 km', fuel: 610 },
  'C&D PLANT': { name: 'Medchal C&D Processing', dist: '18.3 km', fuel: 490 },
};

function randomClassification() {
  const organic = 40 + Math.floor(Math.random() * 30);
  const recyclable = 10 + Math.floor(Math.random() * 30);
  const inert = 5 + Math.floor(Math.random() * 15);
  const hazardous = Math.max(0, 100 - organic - recyclable - inert);
  const truckId = `GHM-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const wards = ['Uppal East', 'Kukatpally West', 'LB Nagar South', 'Secunderabad Central', 'Mehdipatnam'];
  const ward = wards[Math.floor(Math.random() * wards.length)];
  const weight = +(2 + Math.random() * 6).toFixed(1);
  let facility: string;
  if (organic > 55) facility = 'COMPOST PLANT';
  else if (recyclable > 35) facility = 'MRF NACHARAM';
  else facility = facilities[Math.floor(Math.random() * facilities.length)];
  const recovery = organic > 55 ? 1180 : recyclable > 35 ? 3200 : 500;
  return { organic, recyclable, inert, hazardous, truckId, ward, weight, facility, recovery };
}

type ScanPhase = 'scanning' | 'classifying' | 'ready';

export function TransferStationView() {
  const [classification, setClassification] = useState(randomClassification);
  const [scanPhase, setScanPhase] = useState<ScanPhase>('ready');
  const [flash, setFlash] = useState(false);

  const simulate = useCallback(() => {
    setScanPhase('scanning');
    setTimeout(() => setScanPhase('classifying'), 1200);
    setTimeout(() => {
      setScanPhase('ready');
      setClassification(randomClassification());
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, 3000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPhase(p => p === 'ready' ? 'scanning' : p === 'scanning' ? 'classifying' : 'ready');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const c = classification;
  const fd = facilityDetails[c.facility] || facilityDetails['COMPOST PLANT'];
  const netGain = Math.floor(c.recovery * c.weight - fd.fuel);

  const composition = [
    { name: 'Organic', value: c.organic, color: 'oklch(0.72 0.19 145)' },
    { name: 'Recyclable', value: c.recyclable, color: 'oklch(0.65 0.15 230)' },
    { name: 'Inert', value: c.inert, color: 'oklch(0.50 0.02 140)' },
    { name: 'Hazardous', value: c.hazardous, color: 'oklch(0.60 0.24 25)' },
  ];

  const queueData = [
    { id: 'GHM-2201', ward: 'Uppal', weight: '3.8t', status: 'SCANNING', statusColor: 'text-amber' },
    { id: 'GHM-1456', ward: 'LB Nagar', weight: '5.1t', status: 'PENDING DISPATCH', statusColor: 'text-amber' },
    { id: 'GHM-0923', ward: 'Kukatpally', weight: '4.2t', status: 'DISPATCHED → MRF', statusColor: 'text-primary' },
    { id: 'GHM-1789', ward: 'Secunderabad', weight: '3.5t', status: 'DISPATCHED → Compost', statusColor: 'text-primary' },
    { id: 'GHM-0634', ward: 'Mehdipatnam', weight: '4.7t', status: 'AWAITING SCAN', statusColor: 'text-muted-foreground' },
  ];

  return (
    <div className="p-4 space-y-4 animate-page-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Transfer Station 4 — Uppal</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <LiveClock />
            <span className="font-data">Shift: 06:00 – 14:00</span>
            <span>Operator: Ramesh K.</span>
          </div>
        </div>
      </div>

      {/* Camera Panel */}
      <div className="bg-background border border-border rounded-lg overflow-hidden relative" style={{ height: 200 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-data">TIPPING BAY CAMERA — LIVE FEED</span>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="scanline w-full h-16" />
        </div>
        {/* Bounding boxes */}
        <div className="absolute top-8 left-[10%] w-[40%] h-[55%] border-2 border-dashed border-primary rounded-sm">
          <span className="absolute -top-4 left-1 text-[9px] text-primary font-data bg-background/80 px-1 rounded">ORGANIC MATTER</span>
        </div>
        <div className="absolute top-12 right-[15%] w-[20%] h-[35%] border-2 border-chart-2 rounded-sm">
          <span className="absolute -top-4 left-1 text-[9px] text-chart-2 font-data bg-background/80 px-1 rounded">DRY RECYCLABLE</span>
        </div>
        <div className="absolute bottom-6 right-[30%] w-[10%] h-[20%] border-2 border-danger rounded-sm blink">
          <span className="absolute -top-4 left-1 text-[9px] text-danger font-data bg-background/80 px-1 rounded">⚠ HAZARDOUS FLAG</span>
        </div>
      </div>

      {/* Scan status */}
      <div className="text-center font-data text-sm">
        {scanPhase === 'scanning' && <span className="text-amber">SCANNING...</span>}
        {scanPhase === 'classifying' && <span className="text-amber">CLASSIFYING...</span>}
        {scanPhase === 'ready' && <span className="text-primary">RESULT READY ✓</span>}
      </div>

      {/* Classification Result */}
      <div className={`bg-card border border-border rounded-lg p-4 glow-card relative ${flash ? 'flash-overlay' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left - truck info */}
          <div className="space-y-2">
            <div className="text-sm font-data text-foreground">Truck {c.truckId} · Ward: {c.ward}</div>
            <div className="text-sm font-data text-muted-foreground">Load Weight: {c.weight} tonnes</div>
            <div className="flex items-center gap-3 mt-2">
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={composition} cx="50%" cy="50%" innerRadius={20} outerRadius={35} dataKey="value" stroke="none">
                    {composition.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-0.5">
                {composition.map(cc => (
                  <div key={cc.name} className="flex items-center gap-1 text-[10px]">
                    <span className="w-2 h-2 rounded-sm" style={{ background: cc.color }} />
                    <span className="text-muted-foreground">{cc.name}</span>
                    <span className="font-data text-foreground">{cc.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - routing */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary/15 border border-primary/30 rounded-lg px-6 py-4 text-center">
              <div className="text-[10px] text-primary mb-1">ROUTED TO</div>
              <div className="text-lg font-bold text-primary">{c.facility}</div>
              <div className="text-xs text-muted-foreground mt-1">{fd.name} · {fd.dist}</div>
              <div className="text-[10px] text-muted-foreground mt-1 font-data">
                Fuel ₹{fd.fuel} · Recovery ₹{c.recovery}/t · Net ₹{netGain.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Right - constraints */}
          <div className="space-y-1.5 text-xs font-data">
            <div className="text-muted-foreground text-[10px] mb-1">CONSTRAINT CHECK</div>
            <Check pass label={`Organic content >${c.organic > 55 ? '60' : '30'}% — eligible`} />
            <Check pass label={`${fd.name.split(' ')[0]} capacity: 34% — available`} />
            <Check pass label={`Distance ${fd.dist} — within range`} />
            <Check pass label="No water bodies within 2km" />
            <Check pass={false} label="MRF rejected — dry recyclable below 35%" />
            <Check pass={false} label="Landfill bypassed — recovery available" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            CONFIRM & DISPATCH →
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm hover:bg-secondary/80 transition-colors">
            OVERRIDE ROUTING
          </button>
        </div>
      </div>

      {/* Simulate button */}
      <button
        onClick={simulate}
        className="w-full bg-primary/10 border border-primary/30 text-primary py-3 rounded-lg font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
      >
        <Play size={16} /> SIMULATE INCOMING TRUCK
      </button>

      {/* Truck Queue */}
      <div className="bg-card border border-border rounded-lg p-3 glow-card">
        <h3 className="text-xs text-muted-foreground mb-2">TRUCK QUEUE</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-2 font-medium">Truck ID</th>
                <th className="text-left py-2 px-2 font-medium">Ward</th>
                <th className="text-left py-2 px-2 font-medium">Weight</th>
                <th className="text-left py-2 px-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {queueData.map(row => (
                <tr key={row.id} className="border-b border-border/50">
                  <td className="py-2 px-2 font-data">{row.id}</td>
                  <td className="py-2 px-2">{row.ward}</td>
                  <td className="py-2 px-2 font-data">{row.weight}</td>
                  <td className={`py-2 px-2 font-data ${row.statusColor}`}>
                    {row.status === 'SCANNING' && <Loader2 size={10} className="inline animate-spin mr-1" />}
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shift summary */}
      <div className="bg-card border border-border rounded-lg p-3 glow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <SummaryItem label="Trucks Processed" value="47" />
          <SummaryItem label="Diverted" value="38 (81%)" highlight />
          <SummaryItem label="Landfill Sends" value="9" />
          <SummaryItem label="Shift Recovery" value="₹2.31L" highlight />
          <SummaryItem label="CO₂ Saved" value="4.2 tonnes" highlight />
        </div>
      </div>
    </div>
  );
}

function Check({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {pass ? <CheckCircle2 size={12} className="text-primary shrink-0" /> : <XCircle size={12} className="text-danger shrink-0" />}
      <span className={pass ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
    </div>
  );
}

function SummaryItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center">
      <div className="text-muted-foreground">{label}</div>
      <div className={`font-data text-sm font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</div>
    </div>
  );
}
