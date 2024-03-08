use eternum::models::resources::{Resource, ResourceFoodImpl};
use eternum::models::owner::Owner;
use eternum::models::position::{Position, Coord, CoordTrait, Direction};
use eternum::models::realm::Realm;

use eternum::models::map::Tile;

use eternum::systems::map::interface::{
    IMapSystemsDispatcher, IMapSystemsDispatcherTrait
};
use eternum::systems::map::contracts::map_systems;

use eternum::systems::config::contracts::config_systems;
use eternum::systems::config::interface::{
    IRealmFreeMintConfigDispatcher, IRealmFreeMintConfigDispatcherTrait,
    IMapConfigDispatcher, IMapConfigDispatcherTrait
};

use eternum::systems::realm::contracts::realm_systems;
use eternum::systems::realm::interface::{
    IRealmSystemsDispatcher,
    IRealmSystemsDispatcherTrait,
};

use eternum::constants::ResourceTypes;
use eternum::utils::testing::{spawn_eternum, deploy_system};

use dojo::world::{ IWorldDispatcher, IWorldDispatcherTrait};
use starknet::contract_address_const;

const TIMESTAMP: u64 = 10000;
const INITIAL_WHEAT_BALANCE : u128 = 7000;
const INITIAL_FISH_BALANCE : u128 = 2000;

const MAP_EXPLORE_WHEAT_BURN_AMOUNT : u128 = 1000;
const MAP_EXPLORE_FISH_BURN_AMOUNT: u128 = 500;
const MAP_EXPLORE_RANDOM_MINT_AMOUNT: u128 = 3000;
const MAP_EXPLORE_PRECOMPUTED_RANDOM_MINT_RESOURCE : u8 = 6; // silver

fn setup() -> (IWorldDispatcher, u128, IMapSystemsDispatcher) {
    let world = spawn_eternum();

    starknet::testing::set_block_timestamp(TIMESTAMP);


    let config_systems_address 
        = deploy_system(config_systems::TEST_CLASS_HASH);    

    // set initial food resources
    let initial_resources = array![
        (ResourceTypes::WHEAT, INITIAL_WHEAT_BALANCE),
        (ResourceTypes::FISH, INITIAL_FISH_BALANCE),
    ];

    IRealmFreeMintConfigDispatcher {
        contract_address: config_systems_address
    }.set_mint_config(world, initial_resources.span());


    // create realm
    let realm_systems_address 
        = deploy_system(realm_systems::TEST_CLASS_HASH);
    let realm_systems_dispatcher = IRealmSystemsDispatcher {
        contract_address: realm_systems_address
    };

    let position = Position { x: 20, y: 30, entity_id: 1_u128};

    let realm_id = 1;
    let resource_types_packed = 1;
    let resource_types_count = 1;
    let cities = 6;
    let harbors = 5;
    let rivers = 5;
    let regions = 5;
    let wonder = 1;
    let order = 1;

    starknet::testing::set_contract_address(
        contract_address_const::<'realm_owner'>()
    );


    let realm_entity_id = realm_systems_dispatcher.create(
        world, realm_id,
        resource_types_packed, resource_types_count, cities,
        harbors, rivers, regions, wonder, order, position.clone(),
    );


    // set food burn amount during map exploration
    IMapConfigDispatcher {
        contract_address: config_systems_address
    }.set_exploration_config(world,
        MAP_EXPLORE_WHEAT_BURN_AMOUNT, MAP_EXPLORE_FISH_BURN_AMOUNT,  MAP_EXPLORE_RANDOM_MINT_AMOUNT
    );


    // deploy map systems
    let map_systems_address 
        = deploy_system(map_systems::TEST_CLASS_HASH);    
    let map_systems_dispatcher 
        = IMapSystemsDispatcher{contract_address: map_systems_address};

    (world, realm_entity_id, map_systems_dispatcher)
}



#[test]
fn test_map_explore() {

    let (world, realm_entity_id, map_systems_dispatcher) = setup();

    starknet::testing::set_contract_address(
        contract_address_const::<'realm_owner'>()
    );

    starknet::testing::set_transaction_hash('hellothash');

    let realm_position: Position  = get!(world, realm_entity_id, Position);
    let explore_tile_direction: Direction = Direction::West;

    map_systems_dispatcher
        .explore(world, realm_entity_id, realm_position.into(), explore_tile_direction);

    let expected_explored_coord 
        = Into::<Position, Coord>::into(realm_position).neighbor(explore_tile_direction);

    // ensure that Tile model is correct
    let explored_tile: Tile 
        = get!(world, (expected_explored_coord.x, expected_explored_coord.y), Tile);
    assert_eq!(explored_tile.col, explored_tile._col, "wrong col");
    assert_eq!(explored_tile.row, explored_tile._row, "wrong row");
    assert_eq!(explored_tile.explored_by_id, realm_entity_id, "wrong realm owner");
    assert_eq!(explored_tile.explored_at, TIMESTAMP, "wrong exploration time");

    // ensure that the realm's food was deducted

    let expected_wheat_balance = INITIAL_WHEAT_BALANCE - MAP_EXPLORE_WHEAT_BURN_AMOUNT;
    let expected_fish_balance = INITIAL_FISH_BALANCE - MAP_EXPLORE_FISH_BURN_AMOUNT;
    let (realm_wheat, realm_fish) = ResourceFoodImpl::get_food(world, realm_entity_id);

    assert_eq!(realm_wheat.balance, expected_wheat_balance, "wrong wheat balance");
    assert_eq!(realm_fish.balance, expected_fish_balance, "wrong wheat balance");

    // ensure a random resource is minted to explorer
    let expected_mint_resource 
        = get!(world, (realm_entity_id, MAP_EXPLORE_PRECOMPUTED_RANDOM_MINT_RESOURCE), Resource);
    assert_eq!(expected_mint_resource.balance, MAP_EXPLORE_RANDOM_MINT_AMOUNT, "wrong mint amount");
}
