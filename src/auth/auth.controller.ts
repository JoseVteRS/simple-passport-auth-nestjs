import { Controller, Body, Post, ValidationPipe, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authServices: AuthService){}

	@Post('/signup')
	async signUp(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
	): Promise<void> {
		return await this.authServices.signUp(authCredentialsDto)
	}

	@UseGuards(LocalAuthGuard)
	@Post('/signin')
	async signIn(@Request() req: any) {
		return this.authServices.signIn(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getMe(@Request() req: any){
		return req.user
	}
}
