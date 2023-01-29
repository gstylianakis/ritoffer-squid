import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class BuyCouponEvent {
    constructor(props?: Partial<BuyCouponEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    buyer!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    nftID!: bigint

    @Column_("text", {nullable: false})
    escrow!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint

    @Column_("int4", {nullable: false})
    block!: number

    @Column_("text", {nullable: false})
    transactionHash!: string
}
