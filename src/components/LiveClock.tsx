import { useState, useEffect } from 'react';

export function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-data text-sm text-muted-foreground">
      {time.toLocaleTimeString('en-IN', { hour12: false })}
    </span>
  );
}
