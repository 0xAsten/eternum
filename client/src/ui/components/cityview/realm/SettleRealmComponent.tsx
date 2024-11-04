import Button from "../../../elements/Button";

import { useSettleRealm } from "@/hooks/helpers/use-settle-realm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/elements/Collapsible";
import { NumberInput } from "@/ui/elements/NumberInput";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ChevronsUpDown } from "lucide-react";

export const GET_REALMS = gql`
  query getRealms($accountAddress: String!) {
    ercBalance(accountAddress: $accountAddress) {
      balance
      type
      tokenMetadata {
        tokenId
        contractAddress
      }
    }
  }
`;

export const GET_ERC_MINTS = gql`
  query getRealmMints {
    ercTransfer(accountAddress: "0x0", limit: 8000) {
      tokenMetadata {
        tokenId
        contractAddress
      }
    }
  }
`;

const SettleRealmComponent = () => {
  const { data: realmMints } = useQuery({
    queryKey: ["realmMints"],
    queryFn: async () =>
      await request(
        import.meta.env.VITE_PUBLIC_TORII + "/graphql",
        GET_ERC_MINTS,
        {},
        // variables are type-checked too!
      ),
  });

  const { settleRealm, isLoading, selectedOrder, setSelectedOrder, tokenId, setTokenId } = useSettleRealm();

  return (
    <>
      <div className="flex flex-col h-min">
        <div className="flex flex-col gap-y-2">
          <h2 className="border-b-0 text-center">Mint Realms</h2>
          <p>Mint a maximum of 4 Realms (which you can then mint a Season Pass from each)</p>

          <Button
            variant={"primary"}
            onClick={async () => {
              await settleRealm();
            }}
          >
            Mint Random Realm
          </Button>

          <h3 className="text-center">or</h3>

          <Collapsible className="space-y-2 w-full">
            <CollapsibleTrigger asChild>
              <Button variant={"outline"} className="w-full">
                <span>Select Realm</span>
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 border p-2">
              <label className="text-sm text-muted-foreground uppercase justify-self-start">Enter a Realm ID</label>
              <div className="flex">
                <NumberInput className="!bg-brown !w-24" max={8000} min={1} value={tokenId} onChange={setTokenId} />
                <Button
                  isLoading={isLoading}
                  onClick={async () => (!isLoading ? await settleRealm() : null)}
                  className="text-xl"
                  variant={"primary"}
                >
                  {!isLoading ? "Settle Empire" : ""}
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* <div className="grid grid-cols-8 gap-2 pt-4">
          {orders
            // remove the order of the gods
            .filter((order) => order.orderId !== 17)
            .map(({ orderId }) => (
              <div
                key={orderId}
                className={clsx(
                  ' flex relative group items-center justify-center  w-16 h-16 border-2  rounded-lg',
                  selectedOrder == orderId ? 'border-gold !cursor-pointer' : 'border-transparent',
                  'hover:bg-white/10 cursor-pointer'
                )}
                onClick={() => { setSelectedOrder(orderId) }}
              >
                <OrderIcon
                  size={'md'}
                  withTooltip={selectedOrder == orderId}
                  order={getOrderName(orderId)}
                  className={clsx(selectedOrder == orderId ? 'opacity-100' : 'opacity-30 group-hover:opacity-100')}
                />
              </div>
            ))}
        </div>
        <div className="h-[200px] mt-2 overflow-y-auto ">
          <div className="text-lg mt-2 text-gold text-center">{order_statments[selectedOrder - 1]}</div>
        </div> */}
      </div>
    </>
  );
};

export default SettleRealmComponent;
