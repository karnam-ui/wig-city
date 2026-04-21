import { Link, useLocation } from '@tanstack/react-router';
import { Map, Camera, Settings } from 'lucide-react';

const navItems = [
  { label: 'City Dashboard', to: '/' as const, icon: Map },
  { label: 'Transfer Station', to: '/transfer-station' as const, icon: Camera },
  { label: 'Route Optimizer', to: '/route-optimizer' as const, icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 min-h-screen bg-sidebar-bg border-r border-border flex flex-col shrink-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">W</span>
          </div>
          <div>
            <div className="text-primary font-bold text-lg leading-none">WIG</div>
            <div className="text-muted-foreground text-[10px]">Waste Intelligence Grid</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                isActive
                  ? 'text-primary bg-primary/10 border-l-2 border-primary -ml-[2px]'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-primary' : ''} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground text-center">PS-03 · Build & Break 2.0</p>
      </div>
    </aside>
  );
}
