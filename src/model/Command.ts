import { EvmLogEvent, SubstrateBlock } from "@subsquid/substrate-evm-processor";
import { BatchContext } from "@subsquid/substrate-processor";
import {
  CallItem,
  EventItem,
} from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { ethers, logger } from "ethers";
import * as rtf from "../abis/RTF";
import { getContractEntity } from "../contract";
import {
  Owner,
  Token,
  MintEvent,
  BuyCouponEvent,
  EscrowRecord,
} from "../model";
import { Store } from "@subsquid/typeorm-store";

export type EntityTypes =
  | Owner
  | Token
  | MintEvent
  | BuyCouponEvent
  | EscrowRecord;
export default interface Command {
  parseEvents(): Promise<Array<EntityTypes>>;
}

export class CommandMint implements Command {
  block: SubstrateBlock;
  event: EvmLogEvent;
  ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>;
  constructor(
    ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>,
    block: SubstrateBlock,
    event: EvmLogEvent
  ) {
    this.ctx = ctx;
    this.block = block;
    this.event = event;
  }

  async parseEvents(): Promise<Array<EntityTypes>> {
    logger.info("-- parsing mint event --");
    const log = (this.event as any)?.args.log;
    const { minter, nftID, uri, price } = rtf.events.Minted.decode({
      topics: log.topics,
      data: log.data,
    });
    const contractAddress = log.address;
    const owner = new Owner({ id: minter, balance: 0n }); //owners.get(minter) || new Owner({ id: minter, balance: 0n });

    const token = new Token({
      id: nftID.toString(),
      uri: uri,
      price: Number(ethers.utils.formatEther(price)),
      contract: await getContractEntity(this.ctx.store, contractAddress),
      owner: owner,
      isAvailable: true,
      isListed: true,
    });
    const mintEvent = new MintEvent({
      id: this.event.id,
      block: this.block.height,
      transactionHash: this.block.hash,
      timestamp: BigInt(this.block.timestamp),
      uri,
      nftID: nftID.toBigInt(),
      minter,
    });

    return [owner, token, mintEvent];
  }
}

export class CommandBuy implements Command {
  block: SubstrateBlock;
  event: EvmLogEvent;
  ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>;
  constructor(
    ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>,
    block: SubstrateBlock,
    event: EvmLogEvent
  ) {
    this.ctx = ctx;
    this.block = block;
    this.event = event;
  }

  async parseEvents(): Promise<Array<EntityTypes>> {
    logger.info("-- parsing buy event --");
    const log = (this.event as any)?.args.log;
    
    const { executor, nftID, escrow } = rtf.events.BuyCouponEvent.decode({
      topics: log.topics,
      data: log.data,
    });
    
    const buyEvent = new BuyCouponEvent({
      id: this.event.id,
      buyer: executor,
      nftID: nftID.toBigInt(),
      escrow,
      block: this.block.height,
      transactionHash: this.block.hash,
      timestamp: BigInt(this.block.timestamp),
    });

    const owner = new Owner({ id: escrow, balance: 0n });
    const token = new Token({
      id: nftID.toString(),
      isAvailable: false,
      owner,
    });

    const escrowRec = new EscrowRecord({
      id: this.event.id,
      address: escrow,
      buyer: executor,
      token: token,
      status: "PENDING",
      transactionHash: this.block.hash,
      timestamp: BigInt(this.block.timestamp),
      block: this.block.height,
    });
   
    return [buyEvent, owner, token, escrowRec];
  }
}
