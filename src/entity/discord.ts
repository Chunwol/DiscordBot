import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Discord {

    @PrimaryColumn()
    guild: string;

    @Column({ comment: "채널 이름", nullable: true, unique: true})
    channel: string;

    @Column({ comment: "역할 이름", nullable: true, unique: false})
    role: string;
}
