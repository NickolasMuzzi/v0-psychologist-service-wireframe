import { User } from '../../domain/models/user'
import { IUserRepository } from '../../domain/repositories'
export class CreateUserService {
    constructor( private userRepository: IUserRepository ) { }
    async execute ( data: User ) {
        const userAlreadyExists = await this.userRepository.findByEmail( data.email )

        if ( userAlreadyExists ) {
            throw new Error( 'User already exists.' )
        }
        else {
            await this.userRepository.create( data )
        }

    }
}
