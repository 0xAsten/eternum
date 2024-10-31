use eternum::alias::ID;
use starknet::ContractAddress;

#[dojo::interface]
trait IResourceBridgeSystems {
    /// Deposits tokens into the resource bridge, converting them to in-game resources.
    ///
    /// NOTE: this is only to be called by realms_systems and resources are deposited
    ///       directly into the realm
    ///
    /// # Arguments
    ///
    /// * `token` - The address of the ERC20 token being deposited
    /// * `recipient_realm_id` - The ID of the realm receiving the resources
    /// * `amount` - The amount of tokens to deposit
    /// * `client_fee_recipient` - The address to receive the client fee
    ///
    /// # Configuration
    ///
    /// Before calling this function, ensure:
    /// - The token is whitelisted in `ResourceBridgeWhitelistConfig`
    /// - Deposit is not paused in `ResourceBridgeConfig`
    /// - Fee percentages are set in `ResourceBridgeFeeSplitConfig`
    ///
    /// # Fees
    ///
    /// Fees are taken in the following order:
    /// 1. Non-bank fees (velords, season pool, client)
    ///
    ///  NO BANK FEES ARE TAKEN
    ///
    /// # Other Notes
    ///
    /// - The caller must approve this contract to spend the deposit amount
    /// - Resources are deposited directly into realm balance
    ///
    fn deposit_initial(
        ref world: IWorldDispatcher,
        token: ContractAddress,
        recipient_realm_id: ID,
        amount: u256,
        client_fee_recipient: ContractAddress
    );

    /// Deposits tokens into the resource bridge, converting them to in-game resources.
    ///
    /// # Arguments
    ///
    /// * `token` - The address of the ERC20 token being deposited
    /// * `through_bank_id` - The ID of the bank structure handling the deposit
    /// * `recipient_realm_id` - The ID of the realm receiving the resources
    /// * `amount` - The amount of tokens to deposit
    /// * `client_fee_recipient` - The address to receive the client fee
    ///
    /// # Configuration
    ///
    /// Before calling this function, ensure:
    /// - The token is whitelisted in `ResourceBridgeWhitelistConfig`
    /// - Deposit is not paused in `ResourceBridgeConfig`
    /// - Fee percentages are set in `ResourceBridgeFeeSplitConfig`
    /// - Bank fee percentages are set in the `Bank` structure
    ///
    /// # Fees
    ///
    /// Fees are taken in the following order:
    /// 1. Non-bank fees (velords, season pool, client)
    /// 2. Bank fees
    ///
    /// Bank owners do not pay fees when depositing through their own bank.
    ///
    /// # Other Notes
    ///
    /// - The caller must approve this contract to spend the deposit amount
    /// - Donkeys are created to transport the resources to the recipient realm
    ///   so the caller realm must have donkeys to transport the resources
    ///
    fn deposit(
        ref world: IWorldDispatcher,
        token: ContractAddress,
        through_bank_id: ID,
        recipient_realm_id: ID,
        amount: u256,
        client_fee_recipient: ContractAddress
    );

    /// Initiates the withdrawal of in game resources from a realm
    /// to be converted back to an ERC20 token.
    ///
    /// We essentially just transfer the resources to the bank here.
    /// When the donkey arrives at the bank, the `finish_withdraw` function
    /// is called to complete the process.
    ///
    /// # Arguments
    ///
    /// * `through_bank_id` - The ID of the bank structure handling the withdrawal
    /// * `from_realm_id` - The ID of the realm initiating the withdrawal
    /// * `token` - The address of the ERC20 token to receive
    /// * `amount` - The amount of resources to withdraw
    ///
    /// # Configuration
    ///
    /// Before calling this function, ensure:
    /// - The token is whitelisted in `ResourceBridgeWhitelistConfig`
    /// - Withdrawal is not paused in `ResourceBridgeConfig`
    ///
    /// # Notes
    ///
    /// - The caller must be the owner of the `from_realm_id`
    /// - This function only transfers resources to the bank;
    ///   call `finish_withdraw` to complete the process
    /// - No fees are taken at this stage
    fn start_withdraw(
        ref world: IWorldDispatcher, through_bank_id: ID, from_realm_id: ID, token: ContractAddress, amount: u128,
    );


    /// Completes a withdrawal process, converting resources to tokens
    /// and sending them to the recipient outside of the game.
    ///
    /// This func is to be called when a donkey arrives at the bank with the
    /// resources that were sent to the bank in `start_withdraw`.
    ///
    /// Also a bank owner can call this function directly, without needing a donkey,
    /// to withdraw its own resources without paying fees. just set `from_entity_id` to the bank id
    /// as well
    ///
    /// # Arguments
    ///
    /// * `through_bank_id` - The ID of the bank structure handling the withdrawal
    /// * `from_entity_id` - The ID of the entity (usually a realm) withdrawing resources
    /// * `token` - The address of the ERC20 token to receive
    /// * `recipient_address` - The address to receive the withdrawn tokens
    /// * `client_fee_recipient` - The address to receive the client fee
    ///
    /// # Configuration
    ///
    /// Before calling this function, ensure:
    /// - The token is whitelisted in `ResourceBridgeWhitelistConfig`
    /// - Withdrawal is not paused in `ResourceBridgeConfig`
    /// - Fee percentages are set in `ResourceBridgeFeeSplitConfig`
    /// - Bank fee percentages are set in the `Bank` structure
    ///
    /// # Fees
    ///
    /// Fees are taken in the following order:
    /// 1. Bank fees (in resources)
    /// 2. Non-bank fees (velords, season pool, client) in tokens
    ///
    /// Bank owners do not pay fees when withdrawing through their own bank.
    ///
    /// # Notes
    ///
    /// - The caller must be the owner of the `from_entity_id`
    /// - The `from_entity_id` must be at the same location as the bank
    /// - The final token amount received will be less than the withdrawn resource amount due to fees
    fn finish_withdraw(
        ref world: IWorldDispatcher,
        through_bank_id: ID,
        from_entity_id: ID,
        token: ContractAddress,
        recipient_address: ContractAddress,
        client_fee_recipient: ContractAddress
    );
}

#[starknet::interface]
pub trait ERC20ABI<TState> {
    // IERC20
    fn total_supply(self: @TState) -> u256;
    fn balance_of(self: @TState, account: ContractAddress) -> u256;
    fn allowance(self: @TState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TState, recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(ref self: TState, sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
    fn approve(ref self: TState, spender: ContractAddress, amount: u256) -> bool;

    // IERC20Metadata
    fn name(self: @TState) -> ByteArray;
    fn symbol(self: @TState) -> ByteArray;
    fn decimals(self: @TState) -> u8;

    // IERC20CamelOnly
    fn totalSupply(self: @TState) -> u256;
    fn balanceOf(self: @TState, account: ContractAddress) -> u256;
    fn transferFrom(ref self: TState, sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
}

#[dojo::contract]
mod resource_bridge_systems {
    use eternum::alias::ID;
    use eternum::constants::WORLD_CONFIG_ID;
    use eternum::models::bank::bank::Bank;
    use eternum::models::config::{ResourceBridgeWhitelistConfig, ResourceBridgeConfig, ResourceBridgeFeeSplitConfig};
    use eternum::models::owner::{EntityOwner, Owner, EntityOwnerCustomTrait};
    use eternum::models::position::{Position, Coord};
    use eternum::models::resources::{Resource, ResourceCustomImpl, RESOURCE_PRECISION};
    use eternum::models::structure::{Structure, StructureCustomTrait, StructureCategory};
    use eternum::systems::resources::contracts::resource_systems::resource_systems::{InternalResourceSystemsImpl};
    use eternum::utils::math::{pow, PercentageImpl, PercentageValueImpl, min};
    use starknet::ContractAddress;
    use starknet::{get_caller_address, get_contract_address};
    use super::{ERC20ABIDispatcher, ERC20ABIDispatcherTrait};

    #[derive(Copy, Drop, Serde)]
    enum TxType {
        Deposit,
        Withdrawal
    }

    #[abi(embed_v0)]
    impl ResourceBridgeImpl of super::IResourceBridgeSystems<ContractState> {
        fn deposit_initial(
            ref world: IWorldDispatcher,
            token: ContractAddress,
            recipient_realm_id: ID,
            amount: u256,
            client_fee_recipient: ContractAddress
        ) {
            // ensure this system can only be called by realms systems contract
            let caller = get_caller_address();
            let (_realm_systems_class_hash, realm_systems_address) =
                match world.resource(selector_from_tag!("eternum-realm_systems")) {
                dojo::world::Resource::Contract((class_hash, contract_address)) => (class_hash, contract_address),
                _ => (Zeroable::zero(), Zeroable::zero())
            };
            assert!(caller == realm_systems_address, "only realm systems can call this system");

            // ensure transfer recipient is a realm
            let recipient_structure: Structure = get!(world, recipient_realm_id, Structure);
            recipient_structure.assert_is_structure();
            assert!(recipient_structure.category == StructureCategory::Realm, "recipient structure is not a realm");

            // ensure bridge deposit is not paused
            InternalBridgeImpl::assert_deposit_not_paused(world);

            // ensure token is whitelisted
            let resource_bridge_token_whitelist = get!(world, token, ResourceBridgeWhitelistConfig);
            InternalBridgeImpl::assert_resource_whitelisted(world, resource_bridge_token_whitelist);

            let this = get_contract_address();
            assert!(
                ERC20ABIDispatcher { contract_address: token }.transfer_from(realm_systems_address, this, amount),
                "Bridge: transfer failed"
            );

            // take non bank fees from deposit
            let non_bank_fees = InternalBridgeImpl::send_non_bank_fees(
                world, token, client_fee_recipient, amount, TxType::Deposit
            );

            let token_amount_less_non_bank_fees = amount - non_bank_fees;
            let resource_amount_less_non_bank_fees = InternalBridgeImpl::token_amount_to_resource_amount(
                token, token_amount_less_non_bank_fees
            );

            // transfer the resource to the recipient realm
            let resource = array![(resource_bridge_token_whitelist.resource_type, resource_amount_less_non_bank_fees)]
                .span();
            InternalResourceSystemsImpl::transfer(world, 0, recipient_realm_id, resource, 0, false, false);
        }


        fn deposit(
            ref world: IWorldDispatcher,
            token: ContractAddress,
            through_bank_id: ID,
            recipient_realm_id: ID,
            amount: u256,
            client_fee_recipient: ContractAddress
        ) {
            // ensure through bank is a bank
            let through_bank: Structure = get!(world, through_bank_id, Structure);
            through_bank.assert_is_structure();
            assert!(through_bank.category == StructureCategory::Bank, "through bank is not a bank");

            // ensure transfer recipient is a realm
            let recipient_structure: Structure = get!(world, recipient_realm_id, Structure);
            recipient_structure.assert_is_structure();
            assert!(recipient_structure.category == StructureCategory::Realm, "recipient structure is not a realm");

            // ensure bridge deposit is not paused
            InternalBridgeImpl::assert_deposit_not_paused(world);

            // ensure token is whitelisted
            let resource_bridge_token_whitelist = get!(world, token, ResourceBridgeWhitelistConfig);
            InternalBridgeImpl::assert_resource_whitelisted(world, resource_bridge_token_whitelist);

            // transfer the deposit amount from the caller to this contract
            let caller = get_caller_address();
            let this = get_contract_address();
            assert!(
                ERC20ABIDispatcher { contract_address: token }.transfer_from(caller, this, amount),
                "Bridge: transfer failed"
            );

            // take non bank fees from deposit
            let non_bank_fees = InternalBridgeImpl::send_non_bank_fees(
                world, token, client_fee_recipient, amount, TxType::Deposit
            );
            let token_amount_less_non_bank_fees = amount - non_bank_fees;

            // take bank fees from deposit and get final resource amount
            let resource_total_amount = InternalBridgeImpl::token_amount_to_resource_amount(token, amount);
            let resource_bank_fees = InternalBridgeImpl::send_bank_fees(
                world,
                through_bank_id,
                resource_bridge_token_whitelist.resource_type,
                resource_total_amount,
                TxType::Deposit
            );
            let resource_amount_less_non_bank_fees = InternalBridgeImpl::token_amount_to_resource_amount(
                token, token_amount_less_non_bank_fees
            );
            let resource_amount_less_all_fees = resource_amount_less_non_bank_fees - resource_bank_fees;

            // transfer the resource to the recipient realm
            let resource = array![(resource_bridge_token_whitelist.resource_type, resource_amount_less_all_fees)]
                .span();
            InternalResourceSystemsImpl::transfer(
                world, through_bank_id, recipient_realm_id, resource, recipient_realm_id, true, false
            );
        }


        fn start_withdraw(
            ref world: IWorldDispatcher, through_bank_id: ID, from_realm_id: ID, token: ContractAddress, amount: u128,
        ) {
            // ensure caller is owner of from_realm_id
            get!(world, from_realm_id, EntityOwner).assert_caller_owner(world);

            // ensure through bank is a bank
            let through_bank: Structure = get!(world, through_bank_id, Structure);
            through_bank.assert_is_structure();
            assert!(through_bank.category == StructureCategory::Bank, "through bank is not a bank");

            // ensure from_realm_id is a realm
            let from_structure: Structure = get!(world, from_realm_id, Structure);
            from_structure.assert_is_structure();
            assert!(from_structure.category == StructureCategory::Realm, "from structure is not a realm");

            // ensure bridge withdrawal is not paused
            InternalBridgeImpl::assert_withdraw_not_paused(world);

            // ensure token is still whitelisted (incase we want to disable specific resource withdrawals)
            // we also want to make sure it is non zero
            let resource_bridge_token_whitelist = get!(world, token, ResourceBridgeWhitelistConfig);
            InternalBridgeImpl::assert_resource_whitelisted(world, resource_bridge_token_whitelist);

            // transport the resource to the bank
            let resource_type = resource_bridge_token_whitelist.resource_type;
            InternalResourceSystemsImpl::send_to_bank(world, from_realm_id, through_bank_id, (resource_type, amount));
        }

        fn finish_withdraw(
            ref world: IWorldDispatcher,
            through_bank_id: ID,
            from_entity_id: ID,
            token: ContractAddress,
            recipient_address: ContractAddress,
            client_fee_recipient: ContractAddress
        ) {
            // ensure caller is owner of from_entity_id
            get!(world, from_entity_id, EntityOwner).assert_caller_owner(world);

            // ensure through bank is a bank
            let through_bank: Structure = get!(world, through_bank_id, Structure);
            through_bank.assert_is_structure();
            assert!(through_bank.category == StructureCategory::Bank, "through bank is not a bank");

            // ensure from_entity is at the bank
            let from_entity_coord: Coord = get!(world, from_entity_id, Position).into();
            let through_bank_coord: Coord = get!(world, through_bank_id, Position).into();
            assert!(from_entity_coord == through_bank_coord, "from entity and bank are not at the same location");

            // ensure bridge withdrawal is not paused
            InternalBridgeImpl::assert_withdraw_not_paused(world);

            // ensure token is still whitelisted (incase we want to disable specific resource withdrawals)
            // we also want to make sure it is non zero
            let resource_bridge_token_whitelist = get!(world, token, ResourceBridgeWhitelistConfig);
            InternalBridgeImpl::assert_resource_whitelisted(world, resource_bridge_token_whitelist);

            // get resource id associated with token
            let resource_type = resource_bridge_token_whitelist.resource_type;

            // burn resource balance from sender
            let mut resource: Resource = ResourceCustomImpl::get(world, (from_entity_id, resource_type));
            let resource_amount = resource.balance;
            resource.burn(resource_amount);
            resource.save(ref world);

            let token_amount = InternalBridgeImpl::resource_amount_to_token_amount(token, resource_amount);
            let bank_resource_fee_amount = InternalBridgeImpl::send_bank_fees(
                world, through_bank_id, resource_type, resource_amount, TxType::Withdrawal
            );
            let non_bank_token_fee_amount = InternalBridgeImpl::send_non_bank_fees(
                world, token, client_fee_recipient, token_amount, TxType::Withdrawal
            );
            let bank_token_fee_amount = InternalBridgeImpl::resource_amount_to_token_amount(
                token, bank_resource_fee_amount
            );

            // transfer withdrawm amount to recipient
            let withdrawal_amount_less_all_fees = token_amount - bank_token_fee_amount - non_bank_token_fee_amount;
            assert!(
                ERC20ABIDispatcher { contract_address: token }
                    .transfer(recipient_address, withdrawal_amount_less_all_fees),
                "Bridge: transfer failed"
            );
        }
    }

    #[generate_trait]
    impl InternalBridgeImpl of InternalBridgeTrait {
        fn one_token(token: ContractAddress) -> u256 {
            let token_decimal: u8 = ERC20ABIDispatcher { contract_address: token }.decimals();
            return pow(10, token_decimal.into()).into();
        }


        fn assert_deposit_not_paused(world: IWorldDispatcher) {
            let resource_bridge_config = get!(world, WORLD_CONFIG_ID, ResourceBridgeConfig);
            assert!(resource_bridge_config.deposit_paused == false, "resource bridge deposit is paused");
        }

        fn assert_withdraw_not_paused(world: IWorldDispatcher) {
            let resource_bridge_config = get!(world, WORLD_CONFIG_ID, ResourceBridgeConfig);
            assert!(resource_bridge_config.withdraw_paused == false, "resource bridge withdrawal is paused");
        }

        fn assert_resource_whitelisted(
            world: IWorldDispatcher, resource_bridge_token_whitelist: ResourceBridgeWhitelistConfig
        ) {
            assert!(resource_bridge_token_whitelist.resource_type.is_non_zero(), "resource id not whitelisted");
        }

        // Convert from the token's number system to the internal resource number system
        fn token_amount_to_resource_amount(token: ContractAddress, amount: u256) -> u128 {
            let relative_amount: u256 = (amount * RESOURCE_PRECISION.into()) / Self::one_token(token);
            return relative_amount.try_into().unwrap();
        }

        // Convert from the internal resource number system to the token's number system
        fn resource_amount_to_token_amount(token: ContractAddress, amount: u128) -> u256 {
            let relative_amount: u256 = (amount.into() * Self::one_token(token)) / RESOURCE_PRECISION.into();
            return relative_amount;
        }

        fn send_bank_fees(
            world: IWorldDispatcher, bank_id: ID, resource_type: u8, amount: u128, tx_type: TxType
        ) -> u128 {
            let bank = get!(world, bank_id, Bank);
            let bank_owner = get!(world, bank_id, Owner).address;
            // if caller is bank owner, no fees are paid
            if bank_owner != get_caller_address() {
                let fee_split_config = get!(world, WORLD_CONFIG_ID, ResourceBridgeFeeSplitConfig);
                let bank_fee_percent = match tx_type {
                    TxType::Deposit => {
                        min(fee_split_config.max_bank_fee_dpt_percent, bank.owner_bridge_fee_dpt_percent)
                    },
                    TxType::Withdrawal => {
                        min(fee_split_config.max_bank_fee_wtdr_percent, bank.owner_bridge_fee_wtdr_percent)
                    },
                };
                if bank_fee_percent.is_non_zero() {
                    let bank_fee_amount: u128 = Self::calculate_fees(amount.into(), bank_fee_percent)
                        .try_into()
                        .unwrap();
                    assert!(bank_fee_amount.is_non_zero(), "Bridge: amount too small to pay bank fees");
                    // add fees to bank
                    let mut bank_resource = ResourceCustomImpl::get(world, (bank_id, resource_type));
                    bank_resource.add(bank_fee_amount);
                    bank_resource.save(ref world);
                    return bank_fee_amount;
                }
            }
            return 0;
        }

        fn send_non_bank_fees(
            world: IWorldDispatcher,
            token: ContractAddress,
            client_fee_recipient: ContractAddress,
            amount: u256,
            tx_type: TxType
        ) -> u256 {
            let fee_split_config = get!(world, WORLD_CONFIG_ID, ResourceBridgeFeeSplitConfig);
            let (velords_fee_amount, season_pool_fee_amount, client_fee_amount) = match tx_type {
                TxType::Deposit => {
                    (
                        Self::calculate_fees(amount, fee_split_config.velords_fee_on_dpt_percent),
                        Self::calculate_fees(amount, fee_split_config.season_pool_fee_on_dpt_percent),
                        Self::calculate_fees(amount, fee_split_config.client_fee_on_dpt_percent)
                    )
                },
                TxType::Withdrawal => {
                    (
                        Self::calculate_fees(amount, fee_split_config.velords_fee_on_wtdr_percent),
                        Self::calculate_fees(amount, fee_split_config.season_pool_fee_on_wtdr_percent),
                        Self::calculate_fees(amount, fee_split_config.client_fee_on_wtdr_percent)
                    )
                }
            };
            assert!(
                velords_fee_amount.is_non_zero()
                    && season_pool_fee_amount.is_non_zero()
                    && client_fee_amount.is_non_zero(),
                "Bridge: deposit amount too small to take fees"
            );

            // send fees to recipients
            let erc20 = ERC20ABIDispatcher { contract_address: token };
            if velords_fee_amount.is_non_zero() {
                erc20.transfer(fee_split_config.velords_fee_recipient, velords_fee_amount);
            }
            if season_pool_fee_amount.is_non_zero() {
                erc20.transfer(fee_split_config.season_pool_fee_recipient, season_pool_fee_amount);
            }
            if client_fee_amount.is_non_zero() {
                erc20.transfer(client_fee_recipient, client_fee_amount);
            }

            // return the total fees sent
            velords_fee_amount + season_pool_fee_amount + client_fee_amount
        }

        fn calculate_fees(amount: u256, fee_percent: u16) -> u256 {
            return (amount * fee_percent.into()) / PercentageValueImpl::_100().into();
        }
    }
}
