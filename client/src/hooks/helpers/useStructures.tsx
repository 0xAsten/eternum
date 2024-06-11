import { ClientComponents } from "@/dojo/createClientComponents";
import { unpackResources } from "@/ui/utils/packedData";
import { getRealm, getRealmNameById } from "@/ui/utils/realms";
import { calculateDistance } from "@/ui/utils/utils";
import { EternumGlobalConfig, Position, StructureType } from "@bibliothecadao/eternum";
import { useEntityQuery } from "@dojoengine/react";
import { Component, Has, HasValue, getComponentValue, runQuery } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useMemo } from "react";
import { useDojo } from "../context/DojoContext";
import { ArmyInfo, getArmyByEntityId } from "./useArmies";
import { useEntities } from "./useEntities";

export type Structure = ClientComponents["Realm"]["schema"] & { resources: number[] } & { self: boolean } & {
  name: string;
};

export type FullStructure = ClientComponents["Structure"]["schema"] & {
  entityOwner: ClientComponents["EntityOwner"]["schema"];
  owner: ClientComponents["Owner"]["schema"];
  protector: ArmyInfo | undefined;
  name: string;
  isMine: boolean;
};

export const useStructures = () => {
  const {
    setup: {
      components: { Position, Bank, Realm, Structure, EntityOwner, Owner, Protector, Army },
      account: { account },
      systemCalls: { create_hyperstructure },
    },
  } = useDojo();

  // to do: change that when more generalised structure component is added

  const hasStructures = (col: number, row: number) => {
    const bankEntities = runQuery([HasValue(Position, { x: col, y: row }), Has(Bank)]);
    const realmEntities = runQuery([HasValue(Position, { x: col, y: row }), Has(Realm)]);
    // add settlement
    // add hyperstructure
    return Array.from(bankEntities).length > 0 || Array.from(realmEntities).length > 0;
  };

  const createHyperstructure = async (creator_entity_id: bigint, col: number, row: number) => {
    await create_hyperstructure({ signer: account, coords: { x: col, y: row }, creator_entity_id });
  };

  const getStructure = (entityId: bigint): FullStructure | undefined => {
    const structure = getComponentValue(
      Structure,
      getEntityIdFromKeys([entityId]),
    ) as unknown as ClientComponents["Structure"]["schema"];
    if (!structure) {
      return;
    }
    const entityOwner = getComponentValue(
      EntityOwner,
      getEntityIdFromKeys([entityId]),
    ) as unknown as ClientComponents["EntityOwner"]["schema"];
    const owner = getComponentValue(
      Owner,
      getEntityIdFromKeys([BigInt(entityOwner?.entity_owner_id) || 0n]),
    ) as unknown as ClientComponents["Owner"]["schema"];
    const name = getRealmNameById(entityId);

    let protector: ClientComponents["Protector"]["schema"] | undefined | ArmyInfo = getComponentValue(
      Protector,
      getEntityIdFromKeys([entityId]),
    ) as unknown as ClientComponents["Protector"]["schema"];
    protector = protector ? getArmyByEntityId(BigInt(protector.army_id)) : undefined;

    return {
      ...structure,
      entityOwner,
      owner,
      name,
      protector: protector as ArmyInfo | undefined,
      isMine: BigInt(owner!.address) === BigInt(account.address),
    };
  };

  return {
    hasStructures,
    createHyperstructure,
    getStructure,
  };
};

export const useStructuresPosition = ({ position }: { position: Position }) => {
  const {
    setup: {
      components: { Position, Realm, EntityOwner, Owner, Structure },
    },
    account: { account },
  } = useDojo();

  const { getEntityName } = useEntities();

  // structures at position
  const realmsAtPosition = useEntityQuery([HasValue(Position, position), HasValue(Structure, { category: "Realm" })]);
  const structuresAtPosition = useEntityQuery([HasValue(Position, position), Has(Structure)]);

  const formattedRealmAtPosition: Structure = useMemo(() => {
    return realmsAtPosition.map((realm_entity_id: any) => {
      const realm = getComponentValue(Realm as Component, realm_entity_id) as ClientComponents["Realm"]["schema"];
      const entityOwner = getComponentValue(EntityOwner, realm_entity_id);
      const owner = getComponentValue(Owner, getEntityIdFromKeys([entityOwner?.entity_owner_id || 0n]));
      const resources = unpackResources(BigInt(realm?.resource_types_packed || 0n), realm?.resource_types_count || 0);
      const name = getRealmNameById(BigInt(realm?.realm_id) || 0n);

      return {
        ...realm,
        resources,
        self: owner?.address === BigInt(account.address),
        name,
      };
    });
  }, [realmsAtPosition])[0];

  const formattedStructureAtPosition = useMemo(() => {
    return structuresAtPosition.map((entity_id: any) => {
      const structure = getComponentValue(Structure, entity_id);
      const name = structure ? getEntityName(structure?.entity_id) : "";
      const entityOwner = getComponentValue(EntityOwner, entity_id);
      const owner = getComponentValue(Owner, getEntityIdFromKeys([entityOwner?.entity_owner_id || 0n]));
      return {
        entity_id: structure!.entity_id,
        category: StructureType[structure!.category as keyof typeof StructureType],
        self: owner?.address === BigInt(account.address),
        name,
      };
    });
  }, [structuresAtPosition])[0];

  const structureAtPosition = useMemo(() => {
    return formattedStructureAtPosition?.entity_id != null;
  }, [formattedStructureAtPosition]);

  return {
    formattedRealmAtPosition,
    formattedStructureAtPosition,
    structuresAtPosition: structureAtPosition,
  };
};

// TODO: Make Generic
export function useStructuresFromPosition({ position }: { position: Position }) {
  const {
    setup: {
      components: { Realm, Owner },
    },
  } = useDojo();

  const allRealms = useEntityQuery([Has(Realm)]);

  const realms = useMemo(
    () =>
      allRealms.map((entityId) => {
        const realm = getComponentValue(Realm, entityId);
        if (realm) {
          const realmData = getRealm(realm.realm_id);
          if (!realmData) return undefined;
          const name = realmData.name;
          const owner = getComponentValue(Owner, entityId);
          const resources = unpackResources(BigInt(realm.resource_types_packed), realm.resource_types_count);

          const distanceFromPosition = calculateDistance(position, realmData.position) ?? 0;

          const timeToTravel = Math.floor(((distanceFromPosition / EternumGlobalConfig.speed.donkey) * 3600) / 60 / 60);

          return {
            ...realm,
            name,
            position: realmData.position,
            owner: owner?.address,
            resources,
            distanceFromPosition,
            timeToTravel,
          };
        }
      }),
    [allRealms],
  );

  return { realms };
}
