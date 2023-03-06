import { BatchContext } from "@subsquid/substrate-processor";
import {
  CallItem,
  EventItem,
} from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { Store } from "@subsquid/typeorm-store";
import { logger } from "ethers";
import Command from "./Command";

export default class Invoker {
  private entities: Array<any> = [];
  private ctx: BatchContext<
    Store,
    EventItem<"*", false> | CallItem<"*", false>
  >;
  constructor(
    ctx: BatchContext<Store, EventItem<"*", false> | CallItem<"*", false>>
  ) {
    this.ctx = ctx;
  }

  public async process(command: Command) {
    let entitiesCommand = await command.parseEvents();
    this.entities.push([...entitiesCommand]);
  }

  public async save(): Promise<void> {
    let entities = this.entities.flat();
    let entitiesByType = new Map();
    let uniqueIds = new Set();
    let type, id;
    entities.forEach((entity) => {
      type = entity.constructor.name;
      id = `${type}-${entity.id}`;
      if (uniqueIds.has(id)) {
        return;
      }
      uniqueIds.add(id);
      if (entitiesByType.has(type)) {
        uniqueIds.add(entity.id);
        entitiesByType.get(type).push(entity);
      } else {
        entitiesByType.set(type, [entity]);
      }
    });

    for (const [type, entities] of entitiesByType) {
      logger.info("Saving entities of type", type);
      await this.ctx.store.save(entities);
    }

  }
}
