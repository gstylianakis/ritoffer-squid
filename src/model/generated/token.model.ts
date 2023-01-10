import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Owner} from "./owner.model"
import {Transfer} from "./transfer.model"
import {Contract} from "./contract.model"

@Entity_()
export class Token {
    constructor(props?: Partial<Token>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Owner, {nullable: true})
    owner!: Owner | undefined | null

    @Column_("text", {nullable: true})
    uri!: string | undefined | null

    @OneToMany_(() => Transfer, e => e.token)
    transfers!: Transfer[]

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    @Column_("bool", {nullable: true})
    isAvailable!: boolean | undefined | null

    @Column_("bool", {nullable: true})
    isListed!: boolean | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    price!: number | undefined | null
}
