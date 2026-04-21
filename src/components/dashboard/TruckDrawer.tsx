import { X, Truck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const truckData: Record<string, { ward: string; weight: number; facility: string; eta: string; recovery: number }> = {
  'GHM-1847': { ward: 'Uppal East', weight: 4.2, facility: 'Compost Plant — Jawahar Nagar', eta: '12 min', recovery: 4616 },
  'GHM-2103': { ward: 'Kukatpally', weight: 3.8, facility: 'MRF — Nacharam', eta: '18 min', recovery: 5840 },
  'GHM-1592': { ward: 'Secunderabad', weight: 5.1, facility: 'Biogas Plant — Dundigal', eta: '25 min', recovery: 3400 },
  'GHM-0934': { ward: 'LB Nagar', weight: 4.5, facility: 'Compost Plant — Jawahar Nagar', eta: '15 min', recovery: 4950 },
};

const defaultComposition = [
  { name: 'Organic', value: 62, color: 'oklch(0.72 0.19 145)' },
  { name: 'Recyclable', value: 24, color: 'oklch(0.65 0.15 230)' },
  { name: 'Inert', value: 10, color: 'oklch(0.50 0.02 140)' },
  { name: 'Hazardous', value: 4, color: 'oklch(0.60 0.24 25)' },
];

export function TruckDrawer({ truckId, onClose }: { truckId: string | null; onClose: () => void }) {
  if (!truckId) return null;

  const info = truckData[truckId] || { ward: 'Unknown Ward', weight: 3.5, facility: 'Compost Plant', eta: '20 min', recovery: 3200 };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-xl z-50 animate-slide-in-right overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-primary" />
          <span className="font-bold text-foreground font-data">{truckId}</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2 text-sm">
          <Row label="Ward Origin" value={info.ward} />
          <Row label="Load Weight" value={`${info.weight}t`} />
          <Row label="Assigned Facility" value={info.facility} />
          <Row label="ETA" value={info.eta} />
          <Row label="Est. Recovery" value={`₹${info.recovery.toLocaleString()}`} />
        </div>

        <div>
          <h4 className="text-xs text-muted-foreground mb-2">COMPOSITION</h4>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={100} height={100}>
              <PieChart>
                <Pie data={defaultComposition} cx="50%" cy="50%" innerRadius={25} outerRadius={42} dataKey="value" stroke="none">
                  {defaultComposition.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              {defaultComposition.map(c => (
                <div key={c.name} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-2 h-2 rounded-sm" style={{ background: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="font-data text-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-data">{value}</span>
    </div>
  );
}
