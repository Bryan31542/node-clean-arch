import { Request, Response } from 'express'
import { AuthRepository, CustomError, RegisterDto } from '../../domain'
import { JwtAdapter } from '../../config'

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
    res.json({ message: 'Login' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body)

    if (error) {
      return res.status(400).json(error)
    }

    this.authRepository
      .register(registerDto!)
      .then(async user => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.id })
        })
      })
      .catch(error => this.handleError(error, res))
  }
}
