import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./token.model"

@Entity_()
export class EscrowRecord {
    constructor(props?: Partial<EscrowRecord>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    @Column_("text", {nullable: false})
    address!: string

    @Column_("text", {nullable: true})
    buyer!: string | undefined | null

    @Column_("text", {nullable: true})
    status!: string | undefined | null

    @Column_("int4", {nullable: false})
    block!: number

    @Column_("text", {nullable: false})
    transactionHash!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
