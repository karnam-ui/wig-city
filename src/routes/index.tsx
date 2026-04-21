import { createFileRoute } from "@tanstack/react-router";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { CityMap } from "@/components/dashboard/CityMap";
import { TransferFeed } from "@/components/dashboard/TransferFeed";
import { WardHeatmap } from "@/components/dashboard/WardHeatmap";
import { BottomCharts } from "@/components/dashboard/BottomCharts";
import { TruckDrawer } from "@/components/dashboard/TruckDrawer";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);

  return (
    <div className="p-4 space-y-4">
      <KpiStrip />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <CityMap onTruckClick={setSelectedTruck} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <TransferFeed />
          <WardHeatmap />
        </div>
      </div>

      <BottomCharts />

      <TruckDrawer
        truckId={selectedTruck}
        onClose={() => setSelectedTruck(null)}
      />
    </div>
  );
}
