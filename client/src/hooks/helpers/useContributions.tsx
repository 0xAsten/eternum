import { ContractAddress, ID } from "@bibliothecadao/eternum";
import { useEntityQuery } from "@dojoengine/react";
import { ComponentValue, HasValue, getComponentValue, runQuery } from "@dojoengine/recs";
import { useDojo } from "../context/DojoContext";
import { ClientComponents } from "@/dojo/createClientComponents";

export const useContributions = () => {
  const {
    setup: {
      components: { Contribution },
    },
  } = useDojo();

  const getContributions = (hyperstructureEntityId: ID) => {
    const contributionsToHyperstructure = Array.from(
      runQuery([HasValue(Contribution, { hyperstructure_entity_id: hyperstructureEntityId })]),
    ).map((id) => getComponentValue(Contribution, id));

    return contributionsToHyperstructure;
  };

  const getContributionsByPlayerAddress = (playerAddress: ContractAddress, hyperstructureEntityId: ID) => {
    const contributionsToHyperstructure = useEntityQuery([
      HasValue(Contribution, { hyperstructure_entity_id: hyperstructureEntityId, player_address: playerAddress }),
    ])
      .map((id) => getComponentValue(Contribution, id))
      .filter((x): x is ComponentValue<ClientComponents["Contribution"]["schema"]> => x !== undefined);

    return contributionsToHyperstructure;
  };

  return {
    getContributions,
    getContributionsByPlayerAddress,
  };
};
