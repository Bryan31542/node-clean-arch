import {
  AuthDataSource,
  AuthRepository,
  LoginDto,
  RegisterDto,
  UserEntity
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}
  login(loginDto: LoginDto): Promise<UserEntity> {
    return this.authDataSource.login(loginDto)
  }

  register(registerDto: RegisterDto): Promise<UserEntity> {
    return this.authDataSource.register(registerDto)
  }
}
