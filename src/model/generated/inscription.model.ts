import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class Inscription {
    constructor(props?: Partial<Inscription>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @Column_("text", {nullable: false})
    creator!: string

    @Column_("text", {nullable: false})
    data!: string

    @Column_("bool", {nullable: false})
    isEsip6!: boolean
}
