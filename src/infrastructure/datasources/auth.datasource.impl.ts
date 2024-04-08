import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import {
  AuthDataSource,
  CustomError,
  RegisterDto,
  UserEntity
} from '../../domain'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashedPassword: string) => boolean

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

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
