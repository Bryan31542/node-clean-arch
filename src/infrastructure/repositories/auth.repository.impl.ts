import { AuthDataSource, AuthRepository, RegisterDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDataSource: AuthDataSource
    ) { }



    register(registerDto: RegisterDto): Promise<UserEntity> {
        return this.authDataSource.register(registerDto)
    }

}