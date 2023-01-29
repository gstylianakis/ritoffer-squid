// src/contracts.ts

import { BatchContext } from "@subsquid/substrate-processor";
import {
  CallItem,
  EventItem,
} from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { Contract } from "./model";
import { Store } from "@subsquid/typeorm-store";
import Invoker from "./model/Invoker";
import { CommandBuy, CommandMint } from "./model/Command";
import { logger, utils } from "ethers";

import { default as Abi } from "./abis/RTF.json";
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

export async function processEvents(
  ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>
): Promise<void> {
  const invoker = new Invoker(ctx);
  const intrfc = new utils.Interface(Abi);
  let logDescription, event;
  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if ((item.name as string) === "EVM.Log") {
        logDescription = intrfc.parseLog((item as any).event.args.log);
        if (logDescription.name === "Minted") {
          event = new CommandMint(
            ctx,
            block.header as any,
            (item as any).event
          );
          await invoker.process(event);
        } else if (logDescription.name === "BuyCouponEvent") {
          event = new CommandBuy(ctx, block.header as any, (item as any).event);
          await invoker.process(event);
        }
      }
    }
  }
  //catch exception
  try {
    await invoker.save();
  } catch (e) {
    logger.info(e);
  }
}
