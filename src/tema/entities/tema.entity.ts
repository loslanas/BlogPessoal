import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: "tb_temas"}) // CREATE TABLE tb_postagens()
export class Tema{

    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
    @ApiProperty()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    @ApiProperty()
    descricao: string;

    @ApiProperty()
    @OneToMany(()=> Postagem, (postagem) => postagem.tema) //Postagem em Tema
    postagem: Postagem[];

}