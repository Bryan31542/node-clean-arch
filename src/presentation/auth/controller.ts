import { Request, Response } from 'express'
import { AuthRepository, RegisterDto } from '../../domain'

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

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
      .then(user => res.json(user))
      .catch(error => res.status(500).json(error))
  }
}
