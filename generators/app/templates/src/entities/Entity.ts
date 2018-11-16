import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, AfterLoad} from "typeorm";
<%- imports %>

@Entity()
export class <%= entityName %> {

    @PrimaryGeneratedColumn()
    id: number;

<%- columns %>
<%- relations %>}
