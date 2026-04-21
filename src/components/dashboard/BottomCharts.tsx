import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const diversionData = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 48 },
  { day: 'Wed', value: 51 },
  { day: 'Thu', value: 56 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 63 },
  { day: 'Sun', value: 67 },
];

const recoveryData = [
  { type: 'Organic', value: 1100 },
  { type: 'Recyclable', value: 3200 },
  { type: 'C&D Debris', value: 500 },
  { type: 'Hazardous', value: 0 },
];

const topWards = [
  { ward: 'Kukatpally', tonnes: 847 },
  { ward: 'Uppal', tonnes: 721 },
  { ward: 'LB Nagar', tonnes: 698 },
  { ward: 'Mehdipatnam', tonnes: 634 },
  { ward: 'Secunderabad', tonnes: 589 },
];

export function BottomCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-lg p-3 glow-card">
        <h3 className="text-xs text-muted-foreground mb-3">7-DAY LANDFILL DIVERSION %</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={diversionData}>
            <XAxis dataKey="day" tick={{ fill: 'oklch(0.60 0.02 140)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'oklch(0.60 0.02 140)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: 'oklch(0.16 0.025 140)', border: '1px solid oklch(0.25 0.03 140)', borderRadius: 6, fontSize: 11 }} />
            <Bar dataKey="value" radius={[3, 3, 0, 0]}>
              {diversionData.map((_, i) => (
                <Cell key={i} fill={i === diversionData.length - 1 ? 'oklch(0.72 0.19 145)' : 'oklch(0.72 0.19 145 / 0.5)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-3 glow-card">
        <h3 className="text-xs text-muted-foreground mb-3">RECOVERY VALUE BY WASTE TYPE</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={recoveryData} layout="vertical">
            <XAxis type="number" tick={{ fill: 'oklch(0.60 0.02 140)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="type" tick={{ fill: 'oklch(0.60 0.02 140)', fontSize: 9 }} axisLine={false} tickLine={false} width={70} />
            <Tooltip
              contentStyle={{ background: 'oklch(0.16 0.025 140)', border: '1px solid oklch(0.25 0.03 140)', borderRadius: 6, fontSize: 11 }}
              formatter={(val: any) => [`₹${val}/t`, 'Value']}
            />
            <Bar dataKey="value" fill="oklch(0.72 0.19 145)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-3 glow-card">
        <h3 className="text-xs text-muted-foreground mb-3">TOP 5 WARDS BY GENERATION TODAY</h3>
        <div className="space-y-2.5">
          {topWards.map((w, i) => (
            <div key={w.ward} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-3 font-data">{i + 1}</span>
              <span className="text-xs text-foreground w-24 truncate">{w.ward}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(w.tonnes / 850) * 100}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground font-data w-10 text-right">{w.tonnes}t</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
