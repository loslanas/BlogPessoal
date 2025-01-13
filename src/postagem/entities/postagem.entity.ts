import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"tb_postagens"}) // CREATE TABLE tb_postagens()
export class Postagem{
    
    @PrimaryGeneratedColumn()// INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @IsNotEmpty() //validação dos dados do objeto
    @Column({length:100, nullable: false})// varchar(100) not null
    titulo: string;

    @IsNotEmpty() //validação dos dados do objeto
    @Column({length:1000, nullable: false})// varchar(100) not null
    texto: string;

    @UpdateDateColumn()//coloca a data do sistema na publicação
    data: Date;

}