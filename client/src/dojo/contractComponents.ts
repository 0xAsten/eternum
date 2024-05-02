/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export function defineContractComponents(world: World) {
  return {
    Production: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          resource_type: RecsType.Number,
          building_count: RecsType.BigInt,
          production_rate: RecsType.BigInt,
          consumption_rate: RecsType.BigInt,
          last_updated_tick: RecsType.BigInt,
          input_finish_tick: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Production",
            types: ["u128", "u8", "u128", "u128", "u128", "u128", "u64", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    ProductionInput: (() => {
      return defineComponent(
        world,
        {
          output_resource_type: RecsType.Number,
          index: RecsType.Number,
          input_resource_type: RecsType.Number,
          input_resource_amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "ProductionInput",
            types: ["u8", "u8", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ProductionOutput: (() => {
      return defineComponent(
        world,
        { input_resource_type: RecsType.Number, index: RecsType.Number, output_resource_type: RecsType.Number },
        {
          metadata: {
            name: "ProductionOutput",
            types: ["u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    Liquidity: (() => {
      return defineComponent(
        world,
        {
          bank_entity_id: RecsType.BigInt,
          player: RecsType.BigInt,
          resource_type: RecsType.BigInt,
          shares: { mag: RecsType.BigInt, sign: RecsType.Boolean },
        },
        {
          metadata: {
            name: "Liquidity",
            types: ["u128", "u128", "u8", "u128", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    Market: (() => {
      return defineComponent(
        world,
        {
          bank_entity_id: RecsType.BigInt,
          resource_type: RecsType.BigInt,
          lords_amount: RecsType.BigInt,
          resource_amount: RecsType.BigInt,
          total_shares: { mag: RecsType.BigInt, sign: RecsType.Boolean },
        },
        {
          metadata: {
            name: "Market",
            types: ["u128", "u8", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    BankAccounts: (() => {
      return defineComponent(
        world,
        { bank_entity_id: RecsType.BigInt, owner: RecsType.BigInt, entity_id: RecsType.BigInt },
        {
          metadata: {
            name: "BankAccounts",
            types: ["u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Bank: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, owner_fee_scaled: RecsType.BigInt, exists: RecsType.Boolean },
        {
          metadata: {
            name: "Bank",
            types: ["u128", "u128", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    Army: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          troops: { knight_count: RecsType.Number, paladin_count: RecsType.Number, crossbowman_count: RecsType.Number },
          battle_id: RecsType.BigInt,
          battle_side: RecsType.Number,
        },
        {
          metadata: {
            name: "Army",
            types: ["u128", "u32", "u32", "u32", "u128", "enum"],
            customTypes: ["Troops", "BattleSide"],
          },
        },
      );
    })(),
    Battle: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          attack_army: {
            entity_id: RecsType.BigInt,
            troops: {
              knight_count: RecsType.Number,
              paladin_count: RecsType.Number,
              crossbowman_count: RecsType.Number,
            },
            battle_id: RecsType.BigInt,
            battle_side: RecsType.Number,
          },
          defence_army: {
            entity_id: RecsType.BigInt,
            troops: {
              knight_count: RecsType.Number,
              paladin_count: RecsType.Number,
              crossbowman_count: RecsType.Number,
            },
            battle_id: RecsType.BigInt,
            battle_side: RecsType.Number,
          },
          attack_army_health: { entity_id: RecsType.BigInt, current: RecsType.BigInt, lifetime: RecsType.BigInt },
          defence_army_health: { entity_id: RecsType.BigInt, current: RecsType.BigInt, lifetime: RecsType.BigInt },
          attack_delta: RecsType.Number,
          defence_delta: RecsType.Number,
          tick_last_updated: RecsType.BigInt,
          tick_duration_left: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Battle",
            types: [
              "u128",
              "u128",
              "u32",
              "u32",
              "u32",
              "u128",
              "enum",
              "u128",
              "u32",
              "u32",
              "u32",
              "u128",
              "enum",
              "u128",
              "u128",
              "u128",
              "u128",
              "u128",
              "u128",
              "u32",
              "u32",
              "u64",
              "u64",
            ],
            customTypes: ["Army", "Troops", "BattleSide", "Army", "Troops", "BattleSide", "Health", "Health"],
          },
        },
      );
    })(),
    Health: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, current: RecsType.BigInt, lifetime: RecsType.BigInt },
        {
          metadata: {
            name: "Health",
            types: ["u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Capacity: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, weight_gram: RecsType.BigInt },
        {
          metadata: {
            name: "Capacity",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Building: (() => {
      return defineComponent(
        world,
        {
          outer_col: RecsType.BigInt,
          outer_row: RecsType.BigInt,
          inner_col: RecsType.BigInt,
          inner_row: RecsType.BigInt,
          category: RecsType.String,
          produced_resource_type: RecsType.Number,
          bonus_percent: RecsType.BigInt,
          entity_id: RecsType.BigInt,
          outer_entity_id: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Building",
            types: ["u128", "u128", "u128", "u128", "enum", "u8", "u128", "u128"],
            customTypes: ["BuildingCategory"],
          },
        },
      );
    })(),
    CapacityConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          carry_capacity_config_id: RecsType.BigInt,
          entity_type: RecsType.BigInt,
          weight_gram: RecsType.BigInt,
        },
        {
          metadata: {
            name: "CapacityConfig",
            types: ["u128", "u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    LevelingConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          decay_interval: RecsType.Number,
          max_level: RecsType.Number,
          decay_scaled: RecsType.BigInt,
          cost_percentage_scaled: RecsType.BigInt,
          base_multiplier: RecsType.BigInt,
          wheat_base_amount: RecsType.BigInt,
          fish_base_amount: RecsType.BigInt,
          resource_1_cost_id: RecsType.BigInt,
          resource_1_cost_count: RecsType.Number,
          resource_2_cost_id: RecsType.BigInt,
          resource_2_cost_count: RecsType.Number,
          resource_3_cost_id: RecsType.BigInt,
          resource_3_cost_count: RecsType.Number,
        },
        {
          metadata: {
            name: "LevelingConfig",
            types: [
              "u128",
              "u64",
              "u64",
              "u128",
              "u128",
              "u128",
              "u128",
              "u128",
              "u128",
              "u32",
              "u128",
              "u32",
              "u128",
              "u32",
            ],
            customTypes: [],
          },
        },
      );
    })(),
    RoadConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          fee_resource_type: RecsType.Number,
          fee_amount: RecsType.BigInt,
          speed_up_by: RecsType.Number,
        },
        {
          metadata: {
            name: "RoadConfig",
            types: ["u128", "u8", "u128", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    HasClaimedStartingResources: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, config_id: RecsType.Number, claimed: RecsType.Boolean },
        {
          metadata: {
            name: "HasClaimedStartingResources",
            types: ["u128", "u32", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    SoldierConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          resource_cost_id: RecsType.BigInt,
          resource_cost_count: RecsType.Number,
          wheat_burn_per_soldier: RecsType.BigInt,
          fish_burn_per_soldier: RecsType.BigInt,
        },
        {
          metadata: {
            name: "SoldierConfig",
            types: ["u128", "u128", "u32", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    SpeedConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          speed_config_id: RecsType.BigInt,
          entity_type: RecsType.BigInt,
          sec_per_km: RecsType.Number,
        },
        {
          metadata: {
            name: "SpeedConfig",
            types: ["u128", "u128", "u128", "u16"],
            customTypes: [],
          },
        },
      );
    })(),
    TravelConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.BigInt, free_transport_per_city: RecsType.BigInt },
        {
          metadata: {
            name: "TravelConfig",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    WeightConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.BigInt,
          weight_config_id: RecsType.BigInt,
          entity_type: RecsType.BigInt,
          weight_gram: RecsType.BigInt,
        },
        {
          metadata: {
            name: "WeightConfig",
            types: ["u128", "u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    WorldConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.BigInt, admin_address: RecsType.BigInt, realm_l2_contract: RecsType.BigInt },
        {
          metadata: {
            name: "WorldConfig",
            types: ["u128", "contractaddress", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
    HyperStructure: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          hyperstructure_type: RecsType.Number,
          controlling_order: RecsType.Number,
          completed: RecsType.Boolean,
          completion_cost_id: RecsType.BigInt,
          completion_resource_count: RecsType.Number,
        },
        {
          metadata: {
            name: "HyperStructure",
            types: ["u128", "u8", "u8", "bool", "u128", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityName: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, name: RecsType.BigInt },
        {
          metadata: {
            name: "EntityName",
            types: ["u128", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    Level: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, level: RecsType.Number, valid_until: RecsType.Number },
        {
          metadata: {
            name: "Level",
            types: ["u128", "u64", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityMetadata: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, entity_type: RecsType.BigInt },
        {
          metadata: {
            name: "EntityMetadata",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ForeignKey: (() => {
      return defineComponent(
        world,
        { foreign_key: RecsType.BigInt, entity_id: RecsType.BigInt },
        {
          metadata: {
            name: "ForeignKey",
            types: ["felt252", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ArrivalTime: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, arrives_at: RecsType.Number },
        {
          metadata: {
            name: "ArrivalTime",
            types: ["u128", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Movable: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          sec_per_km: RecsType.Number,
          blocked: RecsType.Boolean,
          round_trip: RecsType.Boolean,
          start_coord_x: RecsType.Number,
          start_coord_y: RecsType.Number,
          intermediate_coord_x: RecsType.Number,
          intermediate_coord_y: RecsType.Number,
        },
        {
          metadata: {
            name: "Movable",
            types: ["u128", "u16", "bool", "bool", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    AddressName: (() => {
      return defineComponent(
        world,
        { address: RecsType.BigInt, name: RecsType.BigInt },
        {
          metadata: {
            name: "AddressName",
            types: ["felt252", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityOwner: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, entity_owner_id: RecsType.BigInt },
        {
          metadata: {
            name: "EntityOwner",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Owner: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, address: RecsType.BigInt },
        {
          metadata: {
            name: "Owner",
            types: ["u128", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
    Position: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, x: RecsType.Number, y: RecsType.Number },
        {
          metadata: {
            name: "Position",
            types: ["u128", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Quantity: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, value: RecsType.BigInt },
        {
          metadata: {
            name: "Quantity",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    QuantityTracker: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, count: RecsType.BigInt },
        {
          metadata: {
            name: "QuantityTracker",
            types: ["felt252", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Population: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, population: RecsType.Number, capacity: RecsType.Number },
        {
          metadata: {
            name: "Population",
            types: ["u128", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Realm: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          realm_id: RecsType.BigInt,
          resource_types_packed: RecsType.BigInt,
          resource_types_count: RecsType.Number,
          cities: RecsType.Number,
          harbors: RecsType.Number,
          rivers: RecsType.Number,
          regions: RecsType.Number,
          wonder: RecsType.Number,
          order: RecsType.Number,
        },
        {
          metadata: {
            name: "Realm",
            types: ["u128", "u128", "u128", "u8", "u8", "u8", "u8", "u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    OwnedResourcesTracker: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, resource_types: RecsType.BigInt },
        { metadata: { name: "OwnedResourcesTracker", types: ["u128", "felt252"], customTypes: [] } },
      );
    })(),
    DetachedResource: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          index: RecsType.Number,
          resource_type: RecsType.Number,
          resource_amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "DetachedResource",
            types: ["u128", "u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Resource: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, resource_type: RecsType.Number, balance: RecsType.BigInt },
        {
          metadata: {
            name: "Resource",
            types: ["u128", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceAllowance: (() => {
      return defineComponent(
        world,
        {
          owner_entity_id: RecsType.BigInt,
          approved_entity_id: RecsType.BigInt,
          resource_type: RecsType.Number,
          amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "ResourceAllowance",
            types: ["u128", "u128", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceCost: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, index: RecsType.Number, resource_type: RecsType.Number, amount: RecsType.BigInt },
        {
          metadata: {
            name: "ResourceCost",
            types: ["u128", "u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceLock: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, release_at: RecsType.BigInt },
        {
          metadata: {
            name: "ResourceLock",
            types: ["u128", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Road: (() => {
      return defineComponent(
        world,
        {
          start_coord_x: RecsType.Number,
          start_coord_y: RecsType.Number,
          end_coord_x: RecsType.Number,
          end_coord_y: RecsType.Number,
          usage_count: RecsType.Number,
        },
        {
          metadata: {
            name: "Road",
            types: ["u32", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Status: (() => {
      return defineComponent(
        world,
        { trade_id: RecsType.BigInt, value: RecsType.BigInt },
        {
          metadata: {
            name: "Status",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Trade: (() => {
      return defineComponent(
        world,
        {
          trade_id: RecsType.BigInt,
          maker_id: RecsType.BigInt,
          maker_gives_resources_id: RecsType.BigInt,
          maker_gives_resources_hash: RecsType.BigInt,
          maker_gives_resources_weight: RecsType.BigInt,
          taker_id: RecsType.BigInt,
          taker_gives_resources_id: RecsType.BigInt,
          taker_gives_resources_hash: RecsType.BigInt,
          taker_gives_resources_weight: RecsType.BigInt,
          expires_at: RecsType.Number,
        },
        {
          metadata: {
            name: "Trade",
            types: ["u128", "u128", "u128", "felt252", "u128", "u128", "u128", "felt252", "u128", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Weight: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.BigInt, value: RecsType.BigInt },
        {
          metadata: {
            name: "Weight",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Orders: (() => {
      return defineComponent(
        world,
        { order_id: RecsType.BigInt, hyperstructure_count: RecsType.BigInt },
        {
          metadata: {
            name: "Orders",
            types: ["u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Tile: (() => {
      return defineComponent(
        world,
        {
          _col: RecsType.BigInt,
          _row: RecsType.BigInt,
          col: RecsType.BigInt,
          row: RecsType.BigInt,
          explored_by_id: RecsType.BigInt,
          explored_at: RecsType.Number,
          biome: RecsType.Number,
        },
        {
          metadata: {
            name: "Tile",
            types: ["u128", "u128", "u128", "u128", "u128", "u64", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    TickMove: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.BigInt,
          tick: RecsType.Number,
          count: RecsType.Number,
        },
        {
          metadata: {
            name: "TickMove",
            types: ["u128", "u64", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
  };
}
