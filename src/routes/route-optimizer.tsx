import { createFileRoute } from "@tanstack/react-router";
import { RouteOptimizerView } from "@/components/optimizer/RouteOptimizerView";

export const Route = createFileRoute("/route-optimizer")({
  component: RouteOptimizerPage,
  head: () => ({
    meta: [
      { title: "Route Optimizer — WIG" },
      { name: "description", content: "Constraint-based route optimization for waste logistics" },
    ],
  }),
});

function RouteOptimizerPage() {
  return <RouteOptimizerView />;
}
