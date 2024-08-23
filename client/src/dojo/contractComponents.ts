/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export function defineContractComponents(world: World) {
  return {
    AddressName: (() => {
      return defineComponent(
        world,
        { address: RecsType.BigInt, name: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-AddressName",
            types: ["felt252", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    Army: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          troops: { knight_count: RecsType.BigInt, paladin_count: RecsType.BigInt, crossbowman_count: RecsType.BigInt },
          battle_id: RecsType.Number,
          battle_side: RecsType.String,
        },
        {
          metadata: {
            name: "eternum-Army",
            types: ["u32", "u64", "u64", "u64", "u32", "enum"],
            customTypes: ["Troops", "BattleSide"],
          },
        },
      );
    })(),
    ArrivalTime: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, arrives_at: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-ArrivalTime",
            types: ["u32", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Bank: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          owner_fee_num: RecsType.BigInt,
          owner_fee_denom: RecsType.BigInt,
          exists: RecsType.Boolean,
        },
        {
          metadata: {
            name: "eternum-Bank",
            types: ["u32", "u128", "u128", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    BankConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          lords_cost: RecsType.BigInt,
          lp_fee_num: RecsType.BigInt,
          lp_fee_denom: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-BankConfig",
            types: ["u32", "u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Battle: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          attack_army: {
            troops: {
              knight_count: RecsType.BigInt,
              paladin_count: RecsType.BigInt,
              crossbowman_count: RecsType.BigInt,
            },
            battle_id: RecsType.Number,
            battle_side: RecsType.String,
          },
          attack_army_lifetime: {
            troops: {
              knight_count: RecsType.BigInt,
              paladin_count: RecsType.BigInt,
              crossbowman_count: RecsType.BigInt,
            },
            battle_id: RecsType.Number,
            battle_side: RecsType.String,
          },
          defence_army: {
            troops: {
              knight_count: RecsType.BigInt,
              paladin_count: RecsType.BigInt,
              crossbowman_count: RecsType.BigInt,
            },
            battle_id: RecsType.Number,
            battle_side: RecsType.String,
          },
          defence_army_lifetime: {
            troops: {
              knight_count: RecsType.BigInt,
              paladin_count: RecsType.BigInt,
              crossbowman_count: RecsType.BigInt,
            },
            battle_id: RecsType.Number,
            battle_side: RecsType.String,
          },
          attackers_resources_escrow_id: RecsType.Number,
          defenders_resources_escrow_id: RecsType.Number,
          attack_army_health: { current: RecsType.BigInt, lifetime: RecsType.BigInt },
          defence_army_health: { current: RecsType.BigInt, lifetime: RecsType.BigInt },
          attack_delta: RecsType.BigInt,
          defence_delta: RecsType.BigInt,
          last_updated: RecsType.BigInt,
          duration_left: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-Battle",
            types: [
              "u32",
              "u64",
              "u64",
              "u64",
              "u32",
              "enum",
              "u64",
              "u64",
              "u64",
              "u32",
              "enum",
              "u64",
              "u64",
              "u64",
              "u32",
              "enum",
              "u64",
              "u64",
              "u64",
              "u32",
              "enum",
              "u32",
              "u32",
              "u128",
              "u128",
              "u128",
              "u128",
              "u64",
              "u64",
              "u64",
              "u64",
            ],
            customTypes: [
              "BattleArmy",
              "Troops",
              "BattleSide",
              "BattleArmy",
              "Troops",
              "BattleSide",
              "BattleArmy",
              "Troops",
              "BattleSide",
              "BattleArmy",
              "Troops",
              "BattleSide",
              "BattleHealth",
              "BattleHealth",
            ],
          },
        },
      );
    })(),
    BattleConfig: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, max_tick_duration: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-BattleConfig",
            types: ["u32", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Building: (() => {
      return defineComponent(
        world,
        {
          outer_col: RecsType.Number,
          outer_row: RecsType.Number,
          inner_col: RecsType.Number,
          inner_row: RecsType.Number,
          category: RecsType.String,
          produced_resource_type: RecsType.Number,
          bonus_percent: RecsType.Number,
          entity_id: RecsType.Number,
          outer_entity_id: RecsType.Number,
          paused: RecsType.Boolean,
        },
        {
          metadata: {
            name: "eternum-Building",
            types: ["u32", "u32", "u32", "u32", "enum", "u8", "u32", "u32", "u32", "bool"],
            customTypes: ["BuildingCategory"],
          },
        },
      );
    })(),
    BuildingCategoryPopConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          building_category: RecsType.String,
          population: RecsType.Number,
          capacity: RecsType.Number,
        },
        {
          metadata: {
            name: "eternum-BuildingCategoryPopConfig",
            types: ["u32", "enum", "u32", "u32"],
            customTypes: ["BuildingCategory"],
          },
        },
      );
    })(),
    BuildingConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          category: RecsType.String,
          resource_type: RecsType.Number,
          resource_cost_id: RecsType.Number,
          resource_cost_count: RecsType.Number,
        },
        {
          metadata: {
            name: "eternum-BuildingConfig",
            types: ["u32", "enum", "u8", "u32", "u32"],
            customTypes: ["BuildingCategory"],
          },
        },
      );
    })(),
    BuildingQuantityv2: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, category: RecsType.String, value: RecsType.Number },
        {
          metadata: {
            name: "eternum-BuildingQuantityv2",
            types: ["u32", "enum", "u8"],
            customTypes: ["BuildingCategory"],
          },
        },
      );
    })(),
    Capacity: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, weight_gram: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Capacity",
            types: ["u32", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    CapacityConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          carry_capacity_config_id: RecsType.Number,
          entity_type: RecsType.Number,
          weight_gram: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-CapacityConfig",
            types: ["u32", "u32", "u32", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Contribution: (() => {
      return defineComponent(
        world,
        {
          hyperstructure_entity_id: RecsType.Number,
          player_address: RecsType.BigInt,
          resource_type: RecsType.Number,
          amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-Contribution",
            types: ["u32", "contractaddress", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    DetachedResource: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          index: RecsType.Number,
          resource_type: RecsType.Number,
          resource_amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-DetachedResource",
            types: ["u32", "u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityMetadata: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, entity_type: RecsType.Number },
        {
          metadata: {
            name: "eternum-EntityMetadata",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityName: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, name: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-EntityName",
            types: ["u32", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    EntityOwner: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, entity_owner_id: RecsType.Number },
        {
          metadata: {
            name: "eternum-EntityOwner",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    ForeignKey: (() => {
      return defineComponent(
        world,
        { foreign_key: RecsType.BigInt, entity_id: RecsType.Number },
        {
          metadata: {
            name: "eternum-ForeignKey",
            types: ["felt252", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Guild: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, is_public: RecsType.Boolean, member_count: RecsType.Number },
        {
          metadata: {
            name: "eternum-Guild",
            types: ["u32", "bool", "u16"],
            customTypes: [],
          },
        },
      );
    })(),
    GuildMember: (() => {
      return defineComponent(
        world,
        { address: RecsType.BigInt, guild_entity_id: RecsType.Number },
        {
          metadata: {
            name: "eternum-GuildMember",
            types: ["contractaddress", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    GuildWhitelist: (() => {
      return defineComponent(
        world,
        { address: RecsType.BigInt, guild_entity_id: RecsType.Number, is_whitelisted: RecsType.Boolean },
        {
          metadata: {
            name: "eternum-GuildWhitelist",
            types: ["contractaddress", "u32", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    HasClaimedStartingResources: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, config_id: RecsType.Number, claimed: RecsType.Boolean },
        {
          metadata: {
            name: "eternum-HasClaimedStartingResources",
            types: ["u32", "u32", "bool"],
            customTypes: [],
          },
        },
      );
    })(),
    Health: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, current: RecsType.BigInt, lifetime: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Health",
            types: ["u32", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    HyperstructureResourceConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, resource_type: RecsType.Number, amount_for_completion: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-HyperstructureResourceConfig",
            types: ["u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    HyperstructureUpdate: (() => {
      return defineComponent(
        world,
        {
          hyperstructure_entity_id: RecsType.Number,
          last_updated_timestamp: RecsType.BigInt,
          last_updated_by: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-HyperstructureUpdate",
            types: ["u32", "u64", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
    Level: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, level: RecsType.BigInt, valid_until: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Level",
            types: ["u32", "u64", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    LevelingConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          decay_interval: RecsType.BigInt,
          max_level: RecsType.BigInt,
          decay_scaled: RecsType.BigInt,
          cost_percentage_scaled: RecsType.BigInt,
          base_multiplier: RecsType.BigInt,
          wheat_base_amount: RecsType.BigInt,
          fish_base_amount: RecsType.BigInt,
          resource_1_cost_id: RecsType.Number,
          resource_1_cost_count: RecsType.Number,
          resource_2_cost_id: RecsType.Number,
          resource_2_cost_count: RecsType.Number,
          resource_3_cost_id: RecsType.Number,
          resource_3_cost_count: RecsType.Number,
        },
        {
          metadata: {
            name: "eternum-LevelingConfig",
            types: [
              "u32",
              "u64",
              "u64",
              "u128",
              "u128",
              "u128",
              "u128",
              "u128",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
            ],
            customTypes: [],
          },
        },
      );
    })(),
    Liquidity: (() => {
      return defineComponent(
        world,
        {
          bank_entity_id: RecsType.Number,
          player: RecsType.BigInt,
          resource_type: RecsType.Number,
          shares: { mag: RecsType.BigInt, sign: RecsType.Boolean },
        },
        {
          metadata: {
            name: "eternum-Liquidity",
            types: ["u32", "contractaddress", "u8", "u128", "bool"],
            customTypes: ["Fixed"],
          },
        },
      );
    })(),
    MapExploreConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          wheat_burn_amount: RecsType.BigInt,
          fish_burn_amount: RecsType.BigInt,
          reward_resource_amount: RecsType.BigInt,
          shards_mines_fail_probability: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-MapExploreConfig",
            types: ["u32", "u128", "u128", "u128", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Market: (() => {
      return defineComponent(
        world,
        {
          bank_entity_id: RecsType.Number,
          resource_type: RecsType.Number,
          lords_amount: RecsType.BigInt,
          resource_amount: RecsType.BigInt,
          total_shares: { mag: RecsType.BigInt, sign: RecsType.Boolean },
        },
        {
          metadata: {
            name: "eternum-Market",
            types: ["u32", "u8", "u128", "u128", "u128", "bool"],
            customTypes: ["Fixed"],
          },
        },
      );
    })(),
    MercenariesConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          troops: { knight_count: RecsType.BigInt, paladin_count: RecsType.BigInt, crossbowman_count: RecsType.BigInt },
          rewards: RecsType.StringArray,
        },
        {
          metadata: {
            name: "eternum-MercenariesConfig",
            types: ["u32", "u64", "u64", "u64"],
            customTypes: ["Troops"],
          },
        },
      );
    })(),
    Message: (() => {
      return defineComponent(
        world,
        {
          identity: RecsType.BigInt,
          channel: RecsType.BigInt,
          content: RecsType.String,
          salt: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-Message",
            types: ["felt252", "felt252", "BytesArray", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    Movable: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
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
            name: "eternum-Movable",
            types: ["u32", "u16", "bool", "bool", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Orders: (() => {
      return defineComponent(
        world,
        { order_id: RecsType.Number, hyperstructure_count: RecsType.Number },
        {
          metadata: {
            name: "eternum-Orders",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    OwnedResourcesTracker: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, resource_types: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-OwnedResourcesTracker",
            types: ["u32", "u256"],
            customTypes: [],
          },
        },
      );
    })(),
    Owner: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, address: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Owner",
            types: ["u32", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
    Population: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, population: RecsType.Number, capacity: RecsType.Number },
        {
          metadata: {
            name: "eternum-Population",
            types: ["u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    PopulationConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, base_population: RecsType.Number },
        {
          metadata: {
            name: "eternum-PopulationConfig",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Position: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, x: RecsType.Number, y: RecsType.Number },
        {
          metadata: {
            name: "eternum-Position",
            types: ["u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Production: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          resource_type: RecsType.Number,
          building_count: RecsType.Number,
          production_rate: RecsType.BigInt,
          consumption_rate: RecsType.BigInt,
          last_updated_tick: RecsType.BigInt,
          input_finish_tick: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-Production",
            types: ["u32", "u8", "u8", "u128", "u128", "u64", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    ProductionConfig: (() => {
      return defineComponent(
        world,
        {
          resource_type: RecsType.Number,
          amount: RecsType.BigInt,
          input_count: RecsType.BigInt,
          output_count: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-ProductionConfig",
            types: ["u8", "u128", "u128", "u128"],
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
            name: "eternum-ProductionInput",
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
            name: "eternum-ProductionOutput",
            types: ["u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    Progress: (() => {
      return defineComponent(
        world,
        { hyperstructure_entity_id: RecsType.Number, resource_type: RecsType.Number, amount: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Progress",
            types: ["u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Protectee: (() => {
      return defineComponent(
        world,
        { army_id: RecsType.Number, protectee_id: RecsType.Number },
        {
          metadata: {
            name: "eternum-Protectee",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Protector: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, army_id: RecsType.Number },
        {
          metadata: {
            name: "eternum-Protector",
            types: ["u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Quantity: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, value: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Quantity",
            types: ["u32", "u128"],
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
            name: "eternum-QuantityTracker",
            types: ["felt252", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Realm: (() => {
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
          realm_id: RecsType.Number,
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
            name: "eternum-Realm",
            types: ["u32", "u32", "u128", "u8", "u8", "u8", "u8", "u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    RealmFreeMintConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, detached_resource_id: RecsType.Number, detached_resource_count: RecsType.Number },
        {
          metadata: {
            name: "eternum-RealmFreeMintConfig",
            types: ["u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Resource: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, resource_type: RecsType.Number, balance: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Resource",
            types: ["u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceAllowance: (() => {
      return defineComponent(
        world,
        {
          owner_entity_id: RecsType.Number,
          approved_entity_id: RecsType.Number,
          resource_type: RecsType.Number,
          amount: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-ResourceAllowance",
            types: ["u32", "u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceCost: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, index: RecsType.Number, resource_type: RecsType.Number, amount: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-ResourceCost",
            types: ["u32", "u32", "u8", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    ResourceTransferLock: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, release_at: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-ResourceTransferLock",
            types: ["u32", "u64"],
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
            name: "eternum-Road",
            types: ["u32", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    RoadConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          resource_cost_id: RecsType.Number,
          resource_cost_count: RecsType.Number,
          speed_up_by: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-RoadConfig",
            types: ["u32", "u32", "u32", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    SpeedConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          speed_config_id: RecsType.Number,
          entity_type: RecsType.Number,
          sec_per_km: RecsType.Number,
        },
        {
          metadata: {
            name: "eternum-SpeedConfig",
            types: ["u32", "u32", "u32", "u16"],
            customTypes: [],
          },
        },
      );
    })(),
    Stamina: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, amount: RecsType.Number, last_refill_tick: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Stamina",
            types: ["u32", "u16", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    StaminaConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, unit_type: RecsType.Number, max_stamina: RecsType.Number },
        {
          metadata: {
            name: "eternum-StaminaConfig",
            types: ["u32", "u8", "u16"],
            customTypes: [],
          },
        },
      );
    })(),
    Status: (() => {
      return defineComponent(
        world,
        { trade_id: RecsType.Number, value: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Status",
            types: ["u32", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    Structure: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, category: RecsType.String },
        {
          metadata: {
            name: "eternum-Structure",
            types: ["u32", "enum"],
            customTypes: ["StructureCategory"],
          },
        },
      );
    })(),
    StructureCount: (() => {
      return defineComponent(
        world,
        { coord: { x: RecsType.Number, y: RecsType.Number }, count: RecsType.Number },
        {
          metadata: {
            name: "eternum-StructureCount",
            types: ["u32", "u32", "u8"],
            customTypes: ["Coord"],
          },
        },
      );
    })(),
    TickConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, tick_id: RecsType.Number, tick_interval_in_seconds: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-TickConfig",
            types: ["u32", "u8", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    Tile: (() => {
      return defineComponent(
        world,
        {
          col: RecsType.Number,
          row: RecsType.Number,
          explored_by_id: RecsType.Number,
          explored_at: RecsType.BigInt,
          biome: RecsType.String,
        },
        {
          metadata: {
            name: "eternum-Tile",
            types: ["u32", "u32", "u32", "u64", "enum"],
            customTypes: ["Biome"],
          },
        },
      );
    })(),
    Trade: (() => {
      return defineComponent(
        world,
        {
          trade_id: RecsType.Number,
          maker_id: RecsType.Number,
          maker_gives_resources_id: RecsType.Number,
          maker_gives_resources_hash: RecsType.BigInt,
          maker_gives_resources_weight: RecsType.BigInt,
          taker_id: RecsType.Number,
          taker_gives_resources_id: RecsType.Number,
          taker_gives_resources_hash: RecsType.BigInt,
          taker_gives_resources_weight: RecsType.BigInt,
          expires_at: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-Trade",
            types: ["u32", "u32", "u32", "felt252", "u128", "u32", "u32", "felt252", "u128", "u64"],
            customTypes: [],
          },
        },
      );
    })(),
    TroopConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          health: RecsType.Number,
          knight_strength: RecsType.Number,
          paladin_strength: RecsType.Number,
          crossbowman_strength: RecsType.Number,
          advantage_percent: RecsType.Number,
          disadvantage_percent: RecsType.Number,
          pillage_health_divisor: RecsType.Number,
          army_free_per_structure: RecsType.Number,
          army_extra_per_building: RecsType.Number,
        },
        {
          metadata: {
            name: "eternum-TroopConfig",
            types: ["u32", "u32", "u8", "u8", "u16", "u16", "u16", "u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),
    Weight: (() => {
      return defineComponent(
        world,
        { entity_id: RecsType.Number, value: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-Weight",
            types: ["u32", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    WeightConfig: (() => {
      return defineComponent(
        world,
        {
          config_id: RecsType.Number,
          weight_config_id: RecsType.Number,
          entity_type: RecsType.Number,
          weight_gram: RecsType.BigInt,
        },
        {
          metadata: {
            name: "eternum-WeightConfig",
            types: ["u32", "u32", "u32", "u128"],
            customTypes: [],
          },
        },
      );
    })(),
    WorldConfig: (() => {
      return defineComponent(
        world,
        { config_id: RecsType.Number, admin_address: RecsType.BigInt, realm_l2_contract: RecsType.BigInt },
        {
          metadata: {
            name: "eternum-WorldConfig",
            types: ["u32", "contractaddress", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
  };
}
