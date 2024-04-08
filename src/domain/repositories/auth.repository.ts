import { RegisterDto } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  // todo:
  // abstract login

  abstract register(registerDto: RegisterDto): Promise<UserEntity>
}