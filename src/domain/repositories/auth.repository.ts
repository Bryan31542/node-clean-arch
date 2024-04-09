import { LoginDto } from '../dtos/auth/login.dto'
import { RegisterDto } from '../dtos/auth/register.dto'
import { UserEntity } from '../entities/user.entity'

export abstract class AuthRepository {
  abstract login(loginDto: LoginDto): Promise<UserEntity>

  abstract register(registerDto: RegisterDto): Promise<UserEntity>
}
