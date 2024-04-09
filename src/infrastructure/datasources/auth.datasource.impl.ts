import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import {
  AuthDataSource,
  CustomError,
  RegisterDto,
  UserEntity
} from '../../domain'
import { LoginDto } from '../../domain/dtos/auth/login.dto'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashedPassword: string) => boolean

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto

    try {
      const exists = await UserModel.findOne({ email })
      if (!exists) throw CustomError.badRequest('Check credentials')

      const isMatch = this.comparePassword(password, exists.password)
      if (!isMatch) throw CustomError.badRequest('Check credentials')

      return UserMapper.userEntityFromObject(exists)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto

    try {
      // check if the email exists
      const exists = await UserModel.findOne({ email })
      if (exists) throw CustomError.badRequest('Email already exists')

      // hash the password
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password)
      })

      await user.save()

      // map the data to the entity
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
