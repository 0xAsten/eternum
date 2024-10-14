import { ClientConfigManager } from "@/dojo/modelManager/ConfigManager";
import { useStaminaManager } from "@/hooks/helpers/useStamina";
import useUIStore from "@/hooks/store/useUIStore";
import { ID } from "@bibliothecadao/eternum";
import clsx from "clsx";
import { useMemo } from "react";

export const StaminaResourceCost = ({
  travelingEntityId,
  travelLength,
  isExplored,
  configManager,
}: {
  travelingEntityId: ID | undefined;
  travelLength: number;
  isExplored: boolean;
  configManager: ClientConfigManager;
}) => {
  const currentArmiesTick = useUIStore((state) => state.currentArmiesTick);

  const staminaManager = useStaminaManager(travelingEntityId || 0);

  const stamina = useMemo(() => staminaManager.getStamina(currentArmiesTick), [currentArmiesTick, staminaManager]);

  const destinationHex = useMemo(() => {
    if (!stamina) return;
    const costs =
      travelLength * (isExplored ? -configManager.getTravelStaminaCost() : -configManager.getExploreStaminaCost());
    const balanceColor = stamina !== undefined && stamina.amount < costs ? "text-red/90" : "text-green/90";
    return { isExplored, costs, balanceColor, balance: stamina.amount };
  }, [stamina, travelLength]);

  return (
    destinationHex && (
      <div className="flex flex-row p-1 text-xs">
        <div className="text-lg p-1 pr-3">⚡️</div>
        <div className="flex flex-col">
          <div>
            {destinationHex?.costs}{" "}
            <span className={clsx(destinationHex.balanceColor, "font-normal")}>({destinationHex.balance})</span>
          </div>
          <div>Stamina</div>
        </div>
      </div>
    )
  );
};
