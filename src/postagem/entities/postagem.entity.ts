import { Transform } from "class-transformer";
import { TransformFnParams } from "class-transformer/types/interfaces";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name:"tb_postagens"}) // CREATE TABLE tb_postagens()
export class Postagem{
    
    @PrimaryGeneratedColumn()// INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // impedir que se crie uma váriavel vazia (apenas com espaço)
    @IsNotEmpty() //validação dos dados do objeto
    @Column({length:100, nullable: false})// varchar(100) not null
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //validação dos dados do objeto
    @Column({length:1000, nullable: false})// varchar(100) not null
    texto: string;

    @UpdateDateColumn()//coloca a data do sistema na publicação
    data: Date;

    @ManyToOne(()=> Tema, (tema)=> tema.postagem,{ //tema em postagem
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ManyToOne(()=> Usuario, (usuario)=> usuario.postagem,{ //usuario em postagem
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}