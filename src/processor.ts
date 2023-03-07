// src/processor.ts
import { SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { CHAIN_NODE, processEvents } from "./contract";
import * as rtf from "./abis/RTF";
import { TypeormDatabase } from "@subsquid/typeorm-store";

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor();
const contractAddress: string = process.env.CONTRACT_ADDRESS || "";

processor
  .addEvmLog(contractAddress, {
    range: { from: 2678722 },
    filter: [rtf.events.Minted?.topic],
  })
  .addEvmLog(contractAddress, {
    range: { from: 2678722 },
    filter: [rtf.events.BuyCouponEvent?.topic],
  })
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive("moonbeam", { release: "FireSquid" }),
  });

processor.run(database, async (ctx) => {
  console.log("Processing Events");
  await processEvents(ctx);
});
