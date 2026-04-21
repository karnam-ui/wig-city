import { useLiveData } from '@/hooks/useLiveData';
import { AnimatedValue } from '@/components/AnimatedValue';
import { Truck, TrendingUp, Recycle, IndianRupee } from 'lucide-react';

export function KpiStrip() {
  const data = useLiveData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiCard
        title="Tonnes Collected Today"
        icon={<Truck size={16} className="text-primary" />}
        main={<AnimatedValue value={data.tonnesCollected} className="text-2xl font-bold text-foreground" />}
        sub={<span className="text-muted-foreground text-xs font-data">/ 5,500 target</span>}
        progress={data.tonnesCollected / 5500}
      />
      <KpiCard
        title="Active Trucks"
        icon={<span className="w-2 h-2 rounded-full bg-primary blink" />}
        main={<AnimatedValue value={data.activeTrucks} className="text-2xl font-bold text-foreground" />}
        sub={<span className="text-muted-foreground text-xs font-data">of 2,000 fleet</span>}
      />
      <KpiCard
        title="Diverted from Landfill"
        icon={<TrendingUp size={16} className="text-primary" />}
        main={<AnimatedValue value={data.divertedPercent} decimals={1} suffix="%" className="text-2xl font-bold text-primary" />}
        sub={<span className="text-muted-foreground text-xs">vs 41% last month <TrendingUp size={12} className="inline text-primary" /></span>}
      />
      <KpiCard
        title="Recovery Value Today"
        icon={<IndianRupee size={16} className="text-amber" />}
        main={<span className="text-2xl font-bold text-amber font-data">₹{(data.recoveryValueLakhs / 100).toFixed(2)} Cr</span>}
        sub={<span className="text-muted-foreground text-xs font-data">₹600 Cr projected annual</span>}
      />
    </div>
  );
}

function KpiCard({ title, icon, main, sub, progress }: {
  title: string;
  icon: React.ReactNode;
  main: React.ReactNode;
  sub: React.ReactNode;
  progress?: number;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 glow-card">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-muted-foreground text-xs">{title}</span>
      </div>
      <div>{main}</div>
      <div className="mt-1">{sub}</div>
      {progress !== undefined && (
        <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
