import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	constructor(@InjectModel('User')  private userModel: Model<User>,
		private jwtService: JwtService
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto ): Promise<void> {
		const { username, email, password } = authCredentialsDto
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = new this.userModel({username, email, password: hashedPassword})

		try {
			await user.save()
		} catch (error) {
			if(error.code === 11000) {
				throw new ConflictException('Email already exists')
			}
			throw error
		}
	}

	async signIn(user: User) {
		const payload = {username: user.username, sub: user._id}
		return {
			accessToken: this.jwtService.sign(payload)
		}
	}

	async validateUser(email: string, pass: string): Promise<User> {
		const user = await this.userModel.findOne({email})
		if(!user) {
			return null
		}

		const valid = await bcrypt.compare(pass, user.password)

		if(valid){
			return user
		}

		return null;
	}
}
