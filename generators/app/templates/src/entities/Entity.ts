import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class <%= entityName %> {

    @PrimaryGeneratedColumn()
    id: number;

<%= columns %>}
