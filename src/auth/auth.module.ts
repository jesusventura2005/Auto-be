import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

=======
import { ConfigModule } from '@nestjs/config';
>>>>>>> fcb6efaca59f69eb254de4434c749201b3169c28
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    UsersModule,
<<<<<<< HEAD
    PassportModule,
=======
    // PassportModule.register({ defaultStrategy: 'jwt' }),
>>>>>>> fcb6efaca59f69eb254de4434c749201b3169c28
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
<<<<<<< HEAD
  exports: [JwtStrategy, AuthService, JwtModule],
=======
  exports: [AuthService],
>>>>>>> fcb6efaca59f69eb254de4434c749201b3169c28
})
export class AuthModule {}
