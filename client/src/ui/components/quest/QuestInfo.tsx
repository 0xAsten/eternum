import { useDojo } from "@/hooks/context/DojoContext";
import { useQuery } from "@/hooks/helpers/useQuery";
import { Prize, Quest, QuestStatus } from "@/hooks/helpers/useQuests";
import { useRealm } from "@/hooks/helpers/useRealm";
import { useQuestStore } from "@/hooks/store/useQuestStore";
import Button from "@/ui/elements/Button";
import { ResourceCost } from "@/ui/elements/ResourceCost";
import { ID } from "@bibliothecadao/eternum";
import clsx from "clsx";
import { Check, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { useShepherd } from "react-shepherd";
import { StepOptions } from "shepherd.js";
import { QuestId } from "./questDetails";
import { buildFoodSteps } from "./steps/buildFoodSteps";
import { buildResourceSteps } from "./steps/buildResourceSteps";
import { buildWorkersHutSteps } from "./steps/buildWorkersHutSteps";
import { createAttackArmySteps } from "./steps/createAttackArmy";
import { createDefenseArmySteps } from "./steps/createDefenseArmySteps";
import { createTradeSteps } from "./steps/createTradeSteps";
import { marketSteps } from "./steps/marketSteps";
import { pauseProductionSteps } from "./steps/pauseProductionSteps";
import { settleSteps } from "./steps/settleSteps";
import { travelSteps } from "./steps/travelSteps";

export const questSteps = new Map<QuestId, StepOptions[]>([
  [QuestId.Settle, settleSteps],
  [QuestId.BuildFood, buildFoodSteps],
  [QuestId.BuildResource, buildResourceSteps],
  [QuestId.PauseProduction, pauseProductionSteps],
  [QuestId.CreateTrade, createTradeSteps],
  [QuestId.CreateDefenseArmy, createDefenseArmySteps],
  [QuestId.CreateAttackArmy, createAttackArmySteps],
  [QuestId.Travel, travelSteps],
  [QuestId.BuildWorkersHut, buildWorkersHutSteps],
  [QuestId.Market, marketSteps],
  // [QuestId.Pillage, pillageSteps],
  // [QuestId.Mine, mineSteps],
  // [QuestId.Contribution, contributionSteps],
  // [QuestId.Hyperstructure, hyperstructureSteps],
]);

export const QuestInfo = ({ quest, entityId }: { quest: Quest; entityId: ID }) => {
  const {
    setup: {
      systemCalls: { claim_quest },
    },
    account: { account },
  } = useDojo();

  const { isMapView } = useQuery();

  const [skipQuest, setSkipQuest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedQuest = useQuestStore((state) => state.setSelectedQuest);

  const handleAllClaims = async () => {
    setIsLoading(true);
    try {
      await claim_quest({
        signer: account,
        quest_ids: quest.prizes.map((prize) => BigInt(prize.id)),
        receiver_id: entityId,
      });
    } catch (error) {
      console.error(`Failed to claim resources for quest ${quest.name}:`, error);
    } finally {
      setIsLoading(false);
      setSkipQuest(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-around">
        <Button
          className={clsx({ "animate-pulse": quest.status === QuestStatus.Claimed })}
          variant="outline"
          onClick={() => setSelectedQuest(null)}
        >
          ⬅ Back
        </Button>

        <Button
          disabled={quest.status === QuestStatus.Claimed}
          // className={clsx({ "animate-pulse": quest.status === QuestStatus.Claimed })}
          variant="outline"
          onClick={() => setSkipQuest(!skipQuest)}
        >
          Skip quest
        </Button>
      </div>

      {skipQuest && (
        <>
          <div className="flex justify-center items-baseline">
            <p className="mr-2">Are you sure ?</p>
            <Button variant={"primary"} isLoading={isLoading} onClick={handleAllClaims}>
              Confirm
            </Button>
          </div>
        </>
      )}

      <div className="p-4 text-gold">
        <div className="flex justify-between">
          <h5 className="mb-3 font-bold">{quest.name}</h5>
          {quest.status !== QuestStatus.InProgress ? <Check /> : <ShieldQuestion />}
        </div>

        <div className="text-lg mb-4">{quest.description}</div>

        {quest.steps.length > 0 && (
          <div className="mb-4">
            <hr />
            <h5 className="my-4">Steps</h5>
            {quest.view && (
              <div className={clsx("mb-4 flex gap-2")}>
                Navigate to the{" "}
                <span className="text-xxs font-medium px-0.5 border border-gold bg-transparent rounded flex items-center">
                  {quest.view}
                </span>{" "}
                view
                {(isMapView && quest.view === "WORLD") || (!isMapView && quest.view === "REALM") ? (
                  <Check />
                ) : (
                  <ShieldQuestion />
                )}
              </div>
            )}
            {quest.steps.map((step: any, index: number) => (
              <div className="flex flex-col text-md" key={index}>
                <div className="text-md mb-4">{step}</div>
              </div>
            ))}
            <hr />
          </div>
        )}

        <QuestRewards prizes={quest?.prizes} />

        <StartTourButton steps={questSteps.get(quest.id)} />

        <div className="my-2 grid grid-cols-3 gap-2">
          {quest.status !== QuestStatus.Claimed ? (
            quest.status === QuestStatus.Completed && (
              <Button
                className="claim-selector"
                isPulsing={true}
                isLoading={isLoading}
                variant="primary"
                onClick={handleAllClaims}
              >
                Claim Rewards
              </Button>
            )
          ) : (
            <div className="w-full text-brilliance">Rewards claimed</div>
          )}
        </div>
      </div>
    </>
  );
};

const QuestRewards = ({ prizes }: { prizes: Prize[] }) => {
  const [showRewards, setShowRewards] = useState(false);
  const { getQuestResources } = useRealm();

  return (
    <div className="w-full">
      <div className="flex flex-row items-baseline m-1 ">
        <div className="font-bold mr-5">Quest Rewards</div>
        <Button className="h-6" size="md" variant="outline" onClick={() => setShowRewards(!showRewards)}>
          {showRewards ? "Hide" : "Show"}
        </Button>
      </div>
      {showRewards &&
        prizes &&
        prizes.map((prize, index) => (
          <div key={index} className="grid grid-cols-3 gap-3">
            {getQuestResources()[prize.id].map((resource, i) => (
              <div key={i} className="grid gap-3">
                <ResourceCost resourceId={resource.resource} amount={resource.amount} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export const StartTourButton = ({ steps }: { steps: StepOptions[] | undefined }) => {
  const shepherd = useShepherd();
  const tour = new shepherd.Tour({
    defaultStepOptions: {
      classes: "z-[9999] bg-brown max-w-sm p-2 border border-gold/40 border-gradient rounded-xl text-gold shadow-3xl",
      scrollTo: false,
      modalOverlayOpeningPadding: 5,
    },
    useModalOverlay: true,
    steps,
    exitOnEsc: true,
  });

  const handleStart = () => {
    if (!tour) return;
    tour.start();
  };

  return (
    <Button variant="primary" onClick={() => handleStart()}>
      Tutorial
    </Button>
  );
};
