import {
  AuthDataSource,
  CustomError,
  RegisterDto,
  UserEntity
} from '../../domain'

export class AuthDataSourceImpl implements AuthDataSource {
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto

    try {
      // check if the email exists

      // hash the password

      // map the data to the entity
      return new UserEntity('1', name, email, password, ['admin'])
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
