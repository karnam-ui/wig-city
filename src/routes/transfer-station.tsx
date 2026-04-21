import { createFileRoute } from "@tanstack/react-router";
import { TransferStationView } from "@/components/station/TransferStationView";

export const Route = createFileRoute("/transfer-station")({
  component: TransferStationPage,
  head: () => ({
    meta: [
      { title: "Transfer Station — WIG" },
      { name: "description", content: "Transfer station operator view for waste classification" },
    ],
  }),
});

function TransferStationPage() {
  return <TransferStationView />;
}
