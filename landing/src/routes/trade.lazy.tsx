import { EternumConditionsModal } from "@/components/modules/eternum-conditions-modal";
import { SwapPanel } from "@/components/modules/swap-panel";
import { CountdownTimer } from "@/components/ui/elements/CountdownTimer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/trade")({
  component: () => (
    <div className="flex justify-center items-center h-full top-0 px-2 relative">
      <SwapPanel />
      <EternumConditionsModal open={true} onOpenChange={() => {}} />
      <CountdownTimer targetDate={new Date("2024-12-11T23:00:00")} />
    </div>
  ),
});
