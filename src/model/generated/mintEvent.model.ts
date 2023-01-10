import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class MintEvent {
    constructor(props?: Partial<MintEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    minter!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    nftID!: bigint

    @Column_("text", {nullable: false})
    uri!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint

    @Column_("int4", {nullable: false})
    block!: number

    @Column_("text", {nullable: false})
    transactionHash!: string
}
