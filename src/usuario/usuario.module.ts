import { forwardRef, Module } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from '../auth/auth.module';
 
@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),forwardRef(()=> AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {};