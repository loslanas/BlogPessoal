import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find(); //SELECT * FROM tb_postagens;

    }

    async findById(id: number): Promise<Postagem> {
       
        //SELECT * FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
        }
    }) 
        if(!postagem)
            throw new HttpException('Postagem não encontrada',HttpStatus.NOT_FOUND);
        
        return postagem;
    }

    async findByTitulo(titulo:  string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`) //ILike pq vai ignorar o CASE Sensitive
            }
        });

    }

    async create(postagem: Postagem): Promise<Postagem>{
        //INSERT INTO tb_postagens (itulo, texto) VALUES (?,?)
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{
        
        await this.findById(postagem.id)

        //UPDATE tb_postagens SET titulo =postagem.titulo , texto = postagem.texto, data = CURRENT_TIMESTAMP() WHERE id = postagem.id
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)


        //DELETE tb_postagens WHERE id = ?;
        return await this.postagemRepository.delete(id)


    }

}
