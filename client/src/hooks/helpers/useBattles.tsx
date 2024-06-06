import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../context/DojoContext";
import { Has, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import useBlockchainStore from "../store/useBlockchainStore";
import { getArmyByEntityId } from "./useArmies";
import { ClientComponents } from "@/dojo/createClientComponents";
import { useMemo } from "react";
import { BattleManager } from "@/dojo/modelManager/BattleManager";

export const useBattleManager = (battleId: bigint) => {
  const {
    setup: {
      components: { Battle },
    },
  } = useDojo();

  const battle = useComponentValue(
    Battle,
    getEntityIdFromKeys([BigInt(battleId)]),
  ) as unknown as ClientComponents["Battle"]["schema"];

  const updatedBattle = useMemo(() => {
    return new BattleManager(Battle, battleId);
  }, [battleId, battle]);

  return { updatedBattle };
};

export const useBattles = () => {
  const currentDefaultTick = useBlockchainStore((state) => state.currentDefaultTick);

  const {
    setup: {
      components: { Battle },
    },
  } = useDojo();

  const allBattles = () => {
    const entityIds = useEntityQuery([Has(Battle)]);
    return Array.from(entityIds).map((entityId) => {
      const army = getComponentValue(Battle, entityId);
      if (!army) return;
      return army;
    });
  };

  const battleByEntityId = (attackerEntityId: bigint, defenderEntityId: bigint) => {
    const attackerArmy = getArmyByEntityId({ entity_id: attackerEntityId });
    const defenderArmy = getArmyByEntityId({ entity_id: defenderEntityId });

    if (
      !attackerArmy ||
      !defenderArmy ||
      BigInt(defenderArmy.battle_id) === 0n ||
      attackerArmy.battle_id !== defenderArmy.battle_id
    ) {
      return { battle: null, attackerArmy, defenderArmy };
    }

    const battle = useComponentValue(
      Battle,
      getEntityIdFromKeys([BigInt(defenderArmy.battle_id)]),
    ) as unknown as ClientComponents["Battle"]["schema"];

    if (!battle) return;

    if (battle.last_updated !== currentDefaultTick) {
      updateBattle(battle, BigInt(currentDefaultTick));
    }
    return { battle, attackerArmy, defenderArmy };
  };

  return { allBattles, battleByEntityId };
};

const updateBattle = (battle: any, currentDefaultTick: bigint) => {
  const durationPassed = getDurationPassed(battle, currentDefaultTick);
  decreaseHealthBy(battle.attack_army_health, BigInt(battle.attack_delta) * durationPassed);
  decreaseHealthBy(battle.defence_army_health, BigInt(battle.attack_delta) * durationPassed);
};

const decreaseHealthBy = (health: { current: bigint; lifetime: bigint }, value: bigint) => {
  if (health.current > value) {
    health.current -= value;
  } else {
    health.current = 0n;
  }
};

const getDurationPassed = (battle: any, currentDefaultTick: bigint) => {
  const duractionSinceLastUpdate = currentDefaultTick - battle.last_updated;
  if (battle.duration_left >= duractionSinceLastUpdate) {
    battle.duration_left -= duractionSinceLastUpdate;
    battle.last_updated = currentDefaultTick;
    return duractionSinceLastUpdate;
  } else {
    // battle is over
    const duration = battle.duration_left;
    battle.duration_left = 0n;
    battle.last_updated = currentDefaultTick;

    return duration;
  }
};
