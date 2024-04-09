import { Request, Response } from 'express'
import {
  AuthRepository,
  CustomError,
  LoginDto,
  LoginUser,
  RegisterDto,
  RegisterUser
} from '../../domain'

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginDto.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    new LoginUser(this.authRepository)
      .execute(loginDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    new RegisterUser(this.authRepository)
      .execute(registerDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
