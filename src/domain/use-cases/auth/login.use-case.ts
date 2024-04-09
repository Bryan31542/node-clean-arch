import { JwtAdapter } from '../../../config'
import { LoginDto } from '../../dtos/auth/login.dto'
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

interface LoginUseCase {
  execute(loginDto: LoginDto): Promise<UserToken>
}

export class LoginUser implements LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginDto: LoginDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginDto)

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
