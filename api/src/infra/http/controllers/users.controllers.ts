import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/user/createUserService'

class UsersController {
    constructor( private createUserService: CreateUserService ) { }
    async handleCreateUser ( req: Request, res: Response ) {
        try {
            const { user } = req.body
            await this.createUserService.execute( user )
            return res.status( 201 )
        }
        catch ( err ) {
            if ( err instanceof Error ) {
                return res.status( 400 ).json( { message: err.message } )
            }
            return res.status( 500 ).json( { message: 'Internal Server Error' } )
        }

    }
}

export { UsersController }
