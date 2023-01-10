// src/contracts.ts
import {
  EvmLogEvent,
  SubstrateBlock,
} from "@subsquid/substrate-evm-processor";
import { BatchContext } from "@subsquid/substrate-processor";
import {
  CallItem,
  EventItem,
} from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { BigNumber, ethers, logger } from "ethers";
import * as rtf from "./abis/rtf";
import { Contract, Owner, Token, MintEvent } from "./model";
import { Store } from "@subsquid/typeorm-store";
import { In } from "typeorm";

export const CHAIN_NODE = "wss://moonbeam.unitedbloc.com:3001";

export const contractMapping: Map<string, Contract> = new Map<
  string,
  Contract
>();

export function createContractEntity(address: string): Contract {
  return new Contract({
    id: address,
    name: "Ritoffer Coupon",
    symbol: "RTFCoupon",
    totalSupply: 1000n,
  });
}

const contractAddresstoModel: Map<string, Contract> = new Map<
  string,
  Contract
>();

export async function getContractEntity(
  store: Store,
  address: string
): Promise<Contract | undefined> {
  if (contractAddresstoModel.get(address) == null) {
    let contractEntity = await store.get(Contract, address);
    if (contractEntity == null) {
      contractEntity = createContractEntity(address);
      await store.insert(contractEntity);
    }
    contractAddresstoModel.set(address, contractEntity);
  }
  return contractAddresstoModel.get(address);
}
type MintData = {
  id: string;
  minter: string;
  nftID: BigNumber;
  price: BigNumber;
  contractAddress: string;
  block: number;
  timestamp: bigint;
  uri: string;
  transactionHash: string;
};

export async function processTransfer(
  ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>
): Promise<void> {
  const mintData: MintData[] = [];

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if ((item.name as string) === "EVM.Log") {
        const mintEvent = handleMint(block.header as any, (item as any).event);
        mintData.push(mintEvent);
      }
    }
  }
  if (mintData.length == 0) return;
  await saveMintEvents(ctx, mintData);
}

function handleMint(block: SubstrateBlock, event: EvmLogEvent): MintData {
  console.log("---handleMint---");
  let log = (event as any)?.args.log;
  const { minter, nftID, uri, price } = rtf.events.Minted.decode({
    topics: log.topics,
    data: log.data,
  });

  const mint: MintData = {
    id: event.id,
    minter,
    nftID,
    uri,
    price,
    contractAddress: log.address,
    timestamp: BigInt(block.timestamp),
    block: block.height,
    transactionHash: block.hash,
  };

  return mint;
}

async function saveMintEvents(
  ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>,
  mintData: MintData[]
) {
  const ownersIds: Set<string> = new Set();

  const owners: Map<string, Owner> = new Map(
    (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
      owner.id,
      owner,
    ])
  );
  const tokens: Token[] = [];
  const mintEvents: MintEvent[] = [];

  for (const mintEvent of mintData) {
    let owner = owners.get(mintEvent.minter);
    if (owner == null) {
      owner = new Owner({ id: mintEvent.minter, balance: 0n });
      owners.set(owner.id, owner);
    }

    let token = new Token({
      id: mintEvent.nftID.toString(),
      uri: mintEvent.uri,
      price: Number(ethers.utils.formatEther(mintEvent.price)),
      contract: await getContractEntity(ctx.store, mintEvent.contractAddress),
      owner: owner,
      isAvailable: true,
      isListed: true,
    });
    tokens.push(token);

    const { id, block, transactionHash, timestamp } = mintEvent;
    const mintEventObj = new MintEvent({
      id,
      block,
      transactionHash,
      timestamp,
      uri: mintEvent.uri,
      nftID: mintEvent.nftID.toBigInt(),
      minter: mintEvent.minter,
    });

    mintEvents.push(mintEventObj);
  }
  logger.info("Saving owners, tokens, and mint events");

  await ctx.store.save([...owners.values()]);
  await ctx.store.save([...tokens]);
  await ctx.store.save([...mintEvents]);
}
