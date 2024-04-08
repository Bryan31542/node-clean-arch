import { Router } from 'express'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    // define routes here
      router.post('/login', (req, res) => res.send('Login route'))
      
        router.post('/register', (req, res) => res.send('Register route'))

    return router
  }
}
