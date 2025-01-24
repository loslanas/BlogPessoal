import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        entities: [__dirname + "./../src/**/entities/*.entity.ts"],
        synchronize: true,
      dropSchema: true
    }),
      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());



    await app.init();
  });
    
    afterAll(async () => {
    await app.close();
  });

  it("01-Deve Cadastrar um Novo Usuário", async()=>{
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome:"Root",
      usuario: "root@root.com",
      senha:"rootroot",
      foto: "-"
    })
    .expect(201);

    usuarioId = resposta.body.id;
  })

  it("02 - Não deve cadastra um usuário duplicado", async()=>{
    return await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome:"Root",
      usuario: "root@root.com",
      senha:"rootroot",
      foto: "-"
    })
    .expect(400);
  })

  it("03 - Deve Autenticar um Usuário(login)", async()=>{
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/logar')
   .send({
      usuario: "root@root.com",
      senha: "rootroot"
    })
   .expect(200)
   token = resposta.body.token;
  })

  it("04 - Deve listar todos os usuários", async()=>{
    return await request(app.getHttpServer())
    .get('/usuarios/all')
   .set('Authorization', `${token}`)
   .expect(200);
  })
  
  it("05 - Deve atualizar um Usuário", async()=>{
    return await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome:"RootAtualizado",
      usuario: "rootatualizado@root.com",
      senha:"rootrootatualizado",
      foto: "fotofeia.png"
    })
    .expect(200)
    .then(resposta =>{
      expect("RootAtualizado").toEqual(resposta.body.nome)
    })

  })

  it("06 - Deve listar usuário pelo Id", async() =>{
    return await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set("Authorization", `${token}`)
    .expect(200)
    .then(resposta => {
      expect(usuarioId).toEqual(resposta.body.id)
    })
  })
  
});