import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { jwtConstants } from "./constants/constants";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        forwardRef(()=>UsuarioModule),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn:'1h'}
        })
    ],
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
    exports: [Bcrypt],
})
export class AuthModule {};