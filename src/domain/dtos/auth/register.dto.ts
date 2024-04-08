import { Validators } from '../../../config'

export class RegisterDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterDto?] {
    const { name, email, password } = object

    if (!name) return ['Missing name']
    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (password.length < 8)
      return ['Password must be at least 8 characters long']

    return [undefined, new RegisterDto(name, email, password)]
  }
}
