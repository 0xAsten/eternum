import { useDojo } from "@/hooks/context/DojoContext";
import { ArmyAndName, getArmyByEntityId } from "@/hooks/helpers/useArmies";
import { useBattleManager, useBattles } from "@/hooks/helpers/useBattles";
import useBlockchainStore from "@/hooks/store/useBlockchainStore";
import useUIStore from "@/hooks/store/useUIStore";
import { nameMapping } from "@/ui/components/military/ArmyManagementCard";
import Button from "@/ui/elements/Button";
import { currencyFormat } from "@/ui/utils/utils";
import { ResourcesIds } from "@bibliothecadao/eternum";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const slideUp = {
  hidden: { y: "100%" },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.5 } },
};

const slideDown = {
  hidden: { y: "-100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.3 } },
};

export const BattleView = () => {
  const {
    setup: {
      components: { Battle },
    },
  } = useDojo();
  const battleView = useUIStore((state) => state.battleView);

  const currentDefaultTick = useBlockchainStore((state) => state.currentDefaultTick);

  const attackerArmy = getArmyByEntityId({ entity_id: battleView?.attackerId || 0n });
  const defenderArmy = getArmyByEntityId({ entity_id: battleView?.defenderId || 0n });

  const { updatedBattle } = useBattleManager(BigInt(defenderArmy?.battle_id || 0n));

  // if structure is not 0, then the defender is a structure
  const defenderEntityId = useMemo(() => {
    return defenderArmy?.entity_id;
  }, [battleView?.attackerId, battleView?.defenderId, defenderArmy]);

  const battleAdjusted = useMemo(() => {
    return updatedBattle.getUpdatedBattle(currentDefaultTick);
  }, [currentDefaultTick]);

  return (
    <div>
      <motion.div
        className="absolute top-0 flex w-full"
        variants={slideDown}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="mx-auto bg-brown text-gold text-4xl p-4">Battle</div>
      </motion.div>
      <motion.div className="absolute bottom-0" variants={slideUp} initial="hidden" animate="visible" exit="hidden">
        <BattleProgressBar
          attackingHealth={
            !isNaN(Number(battleAdjusted?.attack_army_health.current))
              ? Number(battleAdjusted?.attack_army_health.current)
              : Number(attackerArmy.current)
          }
          lifetimeAttackingHealth={Number(attackerArmy.lifetime)}
          attacker={attackerArmy.name}
          defendingHealth={
            !isNaN(Number(battleAdjusted?.defence_army_health.current))
              ? Number(battleAdjusted?.defence_army_health.current)
              : Number(defenderArmy.current)
          }
          lifetimeDefendingHealth={Number(defenderArmy.lifetime)}
          defender={defenderArmy?.name}
        />
        <div className="w-screen bg-brown h-64 grid grid-cols-12 py-8">
          <EntityAvatar />
          <TroopRow army={attackerArmy} />
          <Actions
            attacker={BigInt(attackerArmy?.entity_id || "0")}
            defender={BigInt(defenderEntityId || "0")}
            structure={BigInt(battleView?.structure || "0")}
            battleId={BigInt(defenderArmy?.battle_id || "0")}
          />
          <TroopRow army={defenderArmy as ArmyAndName} defending />
          <EntityAvatar />
        </div>
      </motion.div>
    </div>
  );
};

export const BattleProgressBar = ({
  attackingHealth,
  lifetimeAttackingHealth,
  attacker,
  defendingHealth,
  lifetimeDefendingHealth,
  defender,
}: {
  attackingHealth: number;
  lifetimeAttackingHealth: number;
  attacker: string;
  defendingHealth: number;
  lifetimeDefendingHealth: number;
  defender: string;
}) => {
  const totalHealth = attackingHealth + defendingHealth;
  const attackingHealthPercentage = ((attackingHealth / totalHealth) * 100).toFixed(2);
  const defendingHealthPercentage = ((defendingHealth / totalHealth) * 100).toFixed(2);

  const gradient =
    attackingHealthPercentage > defendingHealthPercentage
      ? `linear-gradient(to right, #582C4D ${attackingHealthPercentage}%, rgba(0,0,0,0) ${defendingHealthPercentage}%)`
      : `linear-gradient(to left, #582C4D ${defendingHealthPercentage}%, rgba(0,0,0,0) ${attackingHealthPercentage}%)`;
  const slideUp = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={slideUp}>
      <div className="mx-auto w-2/3 flex justify-between text-2xl text-white">
        <div>
          <p>Your army</p>
          <p>
            Health ❤️: {currencyFormat(attackingHealth, 0)}/{currencyFormat(lifetimeAttackingHealth, 0)}
          </p>
        </div>
        <div>
          <p>{defender}</p>
          <p>
            Health ❤️: {currencyFormat(defendingHealth, 0)}/{currencyFormat(lifetimeDefendingHealth, 0)}
          </p>
        </div>
      </div>
      <div
        className="h-8 mb-2 mx-auto w-2/3 clip-angled-sm "
        style={{
          background: gradient,
        }}
      ></div>
    </motion.div>
  );
};

export const EntityAvatar = () => {
  const slideUp = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.6 } },
  };
  return (
    <div className="col-span-2 flex">
      {" "}
      <div className="mx-auto flex flex-col gap-4">
        <motion.img
          initial="hidden"
          animate="visible"
          variants={slideUp}
          className="w-36 h-36 rounded-full  -mt-28"
          src="./images/avatars/6.png"
          alt=""
        />
        <Button className="w-full">Reinforce Army</Button>
      </div>
    </div>
  );
};

export const Actions = ({
  attacker,
  defender,
  structure,
  battleId,
}: {
  attacker: bigint;
  defender: bigint;
  structure: bigint;
  battleId: bigint;
}) => {
  const [loading, setLoading] = useState(false);
  const setBattleView = useUIStore((state) => state.setBattleView);

  const {
    account: { account },
    network: { provider },
    setup: {
      systemCalls: { create_army, army_buy_troops, battle_start },
      components: { Protector, Army, Health },
    },
  } = useDojo();

  const handleRaid = async () => {
    setLoading(true);

    await provider.battle_pillage({
      signer: account,
      army_id: attacker,
      structure_id: structure,
    });

    setLoading(false);
  };

  const handleBattleStart = async () => {
    setLoading(true);

    await battle_start({
      signer: account,
      attacking_army_id: attacker,
      defending_army_id: defender,
    });

    setLoading(false);
  };

  const handleBattleClaim = async () => {
    setLoading(true);

    await provider.battle_claim({
      signer: account,
      army_id: attacker,
      structure_id: structure,
    });

    setLoading(false);
  };
  const handleLeaveBattle = async () => {
    setLoading(true);

    await provider.battle_leave({
      signer: account,
      army_id: attacker,
      battle_id: battleId,
    });

    setLoading(false);
  };

  return (
    <div className=" col-span-2 flex justify-center">
      <div className="flex flex-col">
        <Button onClick={handleRaid}>Raid</Button>
        <Button onClick={handleBattleStart}>Battle</Button>
        <Button onClick={handleBattleClaim}>Claim Structure</Button>
        <Button onClick={handleLeaveBattle}>Leave Battle</Button>
        <Button onClick={() => setBattleView(null)}>exit view</Button>
      </div>
    </div>
  );
};

export const TroopRow = ({ army, defending = false }: { army: ArmyAndName; defending?: boolean }) => {
  return (
    <div className=" grid-cols-3 col-span-3 gap-2 flex">
      <TroopCard
        defending={defending}
        className={`${defending ? "order-last" : ""} w-1/3`}
        id={ResourcesIds.Crossbowmen}
        count={army?.troops?.crossbowman_count || 0}
      />

      <TroopCard
        defending={defending}
        className={`w-1/3`}
        id={ResourcesIds.Paladin}
        count={army?.troops?.paladin_count || 0}
      />
      <TroopCard
        defending={defending}
        className={`${defending ? "order-first" : ""} w-1/3`}
        id={ResourcesIds.Knight}
        count={army?.troops?.knight_count || 0}
      />
    </div>
  );
};

export const TroopCard = ({
  count,
  id,
  className,
  defending = false,
}: {
  count: number;
  id: ResourcesIds;
  className?: string;
  defending?: boolean;
}) => {
  return (
    <div className={` bg-gold/20 p-2 clip-angled-sm ${className}`}>
      <img
        style={defending ? { transform: "scaleX(-1)" } : {}}
        className="h-28 object-cover mx-auto p-2"
        src={`/images/icons/${id}.png`}
        alt={nameMapping[id]}
      />
      <div className="text-gold text"> {nameMapping[id]}</div>
      <div className="text-gold text-xl">x {currencyFormat(count, 0)}</div>
    </div>
  );
};
