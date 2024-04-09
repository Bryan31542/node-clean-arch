import { JwtAdapter } from '../../../config'
import { RegisterDto } from '../../dtos/auth/register.dto'
import { CustomError } from '../../errors/custom.error'
import { AuthRepository } from '../../repositories/auth.repository'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface RegisterUseCase {
  execute(registerDto: RegisterDto): Promise<UserToken>
}

export class RegisterUser implements RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerDto: RegisterDto): Promise<UserToken> {
    // create the user
    const user = await this.authRepository.register(registerDto)

    // token
    const token = await this.signToken({ id: user.id }, '2h')
    if (!token) throw CustomError.internalServer('Error generating token')

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
