import { Validators } from '../../../config'

export class LoginDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object

    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (password.length < 8)
      return ['Password must be at least 8 characters long']

    return [undefined, new LoginDto(email, password)]
  }
}
