import { LiveClock } from './LiveClock';

export function HeaderBar() {
  return (
    <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <span className="text-primary font-bold text-lg">WIG</span>
        <span className="text-muted-foreground text-xs hidden sm:inline">Waste Intelligence Grid</span>
        <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full font-data">
          GHMC — Hyderabad
        </span>
      </div>
      <div className="flex items-center gap-4">
        <LiveClock />
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary blink" />
          <span className="text-primary text-[10px] font-data">SYSTEM LIVE</span>
        </div>
      </div>
    </header>
  );
}
