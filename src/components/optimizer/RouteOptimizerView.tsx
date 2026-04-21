import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const wasteTypes = ['Organic', 'Dry Recyclable', 'Construction Debris', 'Hazardous', 'Mixed'];
const wardList = ['Kukatpally', 'Uppal', 'LB Nagar', 'Mehdipatnam', 'Secunderabad', 'Gachibowli', 'Kondapur', 'Begumpet'];

interface FacilityResult {
  name: string;
  score: number | 'REJECTED';
  distance: string;
  capacity: string;
  recovery: string;
  badges: { label: string; status: 'pass' | 'warn' | 'fail' }[];
}

function generateResults(wasteType: string): FacilityResult[] {
  const isOrganic = wasteType === 'Organic';
  const isRecyclable = wasteType === 'Dry Recyclable';
  const isCD = wasteType === 'Construction Debris';

  return [
    {
      name: isOrganic ? 'Jawahar Nagar Compost Plant' : isRecyclable ? 'MRF Nacharam' : isCD ? 'Medchal C&D Plant' : 'Dundigal Biogas Plant',
      score: 94,
      distance: '12.4km',
      capacity: '34% free',
      recovery: isRecyclable ? '₹3,200/t' : isOrganic ? '₹1,100/t' : '₹500/t',
      badges: [
        { label: 'Type Match', status: 'pass' },
        { label: 'Capacity', status: 'pass' },
        { label: 'Environmental Clear', status: 'pass' },
      ],
    },
    {
      name: 'Dundigal Biogas Plant',
      score: 71,
      distance: '22.1km',
      capacity: '61% free',
      recovery: '₹800/t',
      badges: [
        { label: 'Type Match', status: 'pass' },
        { label: 'Capacity', status: 'pass' },
        { label: 'Distance', status: 'warn' },
      ],
    },
    {
      name: 'Patancheru MRF',
      score: 'REJECTED',
      distance: '15.2km',
      capacity: '78% free',
      recovery: '₹0/t',
      badges: [
        { label: 'Waste type mismatch', status: 'fail' },
        { label: 'Water body 1.1km — exclusion zone', status: 'fail' },
      ],
    },
  ];
}

function generateLogs(wasteType: string, facilityName: string): string[] {
  return [
    '> Loading facility registry... 8 facilities found',
    `> Filtering by waste type: ${wasteType.toUpperCase()}... 4 eligible`,
    '> Applying exclusion zones... 1 eliminated',
    '> Checking capacity constraints... 3 remaining',
    '> Ranking by recovery value and distance...',
    `> Optimal route: ${facilityName}`,
    '> Confidence: 94%  |  Net gain: ₹4,616',
    '> Route optimization complete.',
  ];
}

export function RouteOptimizerView() {
  const [wasteType, setWasteType] = useState('Organic');
  const [weight, setWeight] = useState(4);
  const [ward, setWard] = useState('Kukatpally');
  const [urgency, setUrgency] = useState<'Normal' | 'Priority'>('Normal');
  const [results, setResults] = useState<FacilityResult[] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const runOptimizer = () => {
    setRunning(true);
    setResults(null);
    setLogs([]);

    const r = generateResults(wasteType);
    const logLines = generateLogs(wasteType, typeof r[0].score === 'number' ? r[0].name : 'N/A');

    logLines.forEach((line, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, line]);
      }, (i + 1) * 400);
    });

    setTimeout(() => {
      setResults(r);
      setRunning(false);
    }, logLines.length * 400 + 200);
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="p-4 space-y-4 animate-page-in">
      <h1 className="text-xl font-bold text-foreground">Constraint Route Optimizer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left - Form */}
        <div className="bg-card border border-border rounded-lg p-4 glow-card space-y-4">
          <h3 className="text-xs text-muted-foreground">CONFIGURE ROUTING SCENARIO</h3>

          <Field label="Waste Type">
            <select value={wasteType} onChange={e => setWasteType(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              {wasteTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>

          <Field label={`Load Weight: ${weight}t`}>
            <input type="range" min={1} max={10} step={0.5} value={weight} onChange={e => setWeight(+e.target.value)} className="w-full accent-primary" />
            <div className="flex justify-between text-[10px] text-muted-foreground font-data"><span>1t</span><span>10t</span></div>
          </Field>

          <Field label="Origin Ward">
            <select value={ward} onChange={e => setWard(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              {wardList.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>

          <Field label="Urgency">
            <div className="flex gap-2">
              {(['Normal', 'Priority'] as const).map(u => (
                <button
                  key={u}
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-2 rounded-md text-sm transition-colors ${urgency === u ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </Field>

          <button
            onClick={runOptimizer}
            disabled={running}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {running ? 'RUNNING...' : 'RUN OPTIMIZER'}
          </button>
        </div>

        {/* Right - Results */}
        <div className="lg:col-span-2 space-y-3">
          {results ? results.map((r, i) => (
            <div
              key={i}
              className={`bg-card border rounded-lg p-4 glow-card ${
                r.score === 'REJECTED' ? 'border-danger/50 opacity-60' :
                typeof r.score === 'number' && r.score > 85 ? 'border-primary/50' :
                'border-amber/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-foreground font-medium">{r.name}</span>
                  {i === 0 && r.score !== 'REJECTED' && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">RECOMMENDED</span>}
                </div>
                <span className={`font-data text-lg font-bold ${r.score === 'REJECTED' ? 'text-danger' : typeof r.score === 'number' && r.score > 85 ? 'text-primary' : 'text-amber'}`}>
                  {r.score === 'REJECTED' ? 'REJECTED' : `${r.score}/100`}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground font-data mb-2">
                <span>Distance: {r.distance}</span>
                <span>Capacity: {r.capacity}</span>
                <span>Recovery: {r.recovery}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.badges.map((b, j) => (
                  <span key={j} className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                    b.status === 'pass' ? 'bg-primary/10 text-primary' :
                    b.status === 'warn' ? 'bg-amber/10 text-amber' :
                    'bg-danger/10 text-danger'
                  }`}>
                    {b.status === 'pass' ? <CheckCircle2 size={10} /> : b.status === 'warn' ? <AlertTriangle size={10} /> : <XCircle size={10} />}
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          )) : !running && (
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center text-muted-foreground text-sm">
              Configure parameters and run the optimizer to see results
            </div>
          )}
        </div>
      </div>

      {/* Constraint Log */}
      <div className="bg-background border border-border rounded-lg p-3 glow-card">
        <h3 className="text-xs text-muted-foreground mb-2">CONSTRAINT LOG</h3>
        <div ref={logRef} className="bg-[oklch(0.10_0.02_140)] rounded-md p-3 h-40 overflow-y-auto font-data text-xs space-y-1">
          {logs.length === 0 ? (
            <span className="text-muted-foreground">Waiting for optimizer run...</span>
          ) : logs.map((line, i) => (
            <div key={i} className="text-primary/90">{line}</div>
          ))}
          {running && <span className="text-amber blink">█</span>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
      {children}
    </div>
  );
}
