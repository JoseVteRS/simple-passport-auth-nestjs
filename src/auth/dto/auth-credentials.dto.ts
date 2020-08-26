import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator'

export class AuthCredentialsDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsString()
	@MinLength(1)
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8, {message: 'Password is to shor (8 characters min)'})
	@MaxLength(20, {message: 'Password is to long (20 characters max'})
	password: string;
}