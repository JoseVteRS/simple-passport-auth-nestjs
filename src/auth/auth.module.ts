import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserSchema } from './schemas/user.schema'
import { JwtStrategy } from './Strategies/jwt-auth.strategy';
import { LocalStrategy } from './Strategies/local.strategy';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '24h'}
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
  	controllers: [AuthController],
  	exports:[AuthService]
})
export class AuthModule {}
