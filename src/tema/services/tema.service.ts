import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ){}
    async findAll(): Promise<Tema[]>{
        return await this.temaRepository.find({
            relations:{
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema>{

        const tema =await this.temaRepository.findOne({ //SELECT * FROM tb_postagens where id = id_procurado;
            where:{
                id
            }, relations:{
                postagem: true
            }
        });

        if (!tema)
            throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND);
        return tema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]>{
        return await this.temaRepository.find({ 
            where:{
                descricao: ILike(`%${descricao}%`)
            }, relations:{
                postagem: true
            }
        });

       
    }

    async create(tema: Tema): Promise<Tema>{
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema>{
            
            await this.findById(tema.id)
    
            //UPDATE tb_postagens SET descricao = tema.descricao WHERE id = tema.id
            return await this.temaRepository.save(tema);
        }
    
        async delete(id: number): Promise<DeleteResult>{
            
            await this.findById(id) //não precisa especificar o objeto pq pra deletar não importa
    
            return await this.temaRepository.delete(id);
        }
}