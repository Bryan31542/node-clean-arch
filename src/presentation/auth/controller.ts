import { Request, Response } from 'express'
import { RegisterDto } from '../../domain'

export class AuthController {
  // DI
  constructor() {}

  loginUser = (req: Request, res: Response) => {
    res.json({ message: 'Login' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    res.json(registerDto)
  }
}
