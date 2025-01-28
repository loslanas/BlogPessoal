import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PostagemController{

    constructor(
        private readonly postagemService: PostagemService

    ){}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Postagem[]> {
        return  this.postagemService.findAll();

    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) //parseintpipe converte de string pra int
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return  this.postagemService.findById(id);

    }

    @Get('/titulo/:titulo') //um é o caminho e o outro é a variável. 
    @HttpCode(HttpStatus.OK) //parseintpipe não precisa pois as variaveis são string
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return  this.postagemService.findByTitulo(titulo);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //parseintpipe converte de string pra int
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);

    }

}