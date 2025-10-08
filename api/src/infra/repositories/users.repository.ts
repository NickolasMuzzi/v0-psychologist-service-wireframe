import { IUserRepository } from "../../domain/repositories/IUsersRepository"
import { User } from "../../domain/models/user"
import prisma from '../database/prisma'
import { DateTime } from "luxon"
import { convertDate } from "../../utils/convertDate"

export class PrismaUsersRepository implements IUserRepository {
    async create ( user: User ) {
        const birthDate = user.data_nascimento.toJSDate()
        await prisma.user.create( { data: { ...user, data_nascimento: birthDate } } )
    }
    async findByEmail ( email: string ) {
        let userToReturn: User
        const user = await prisma.user.findFirst( { where: { email: email } } )
        if ( user && user.data_nascimento ) {
            userToReturn = { ...user, data_nascimento: DateTime.fromJSDate( user.data_nascimento ) }
            return userToReturn
        }
        return null
    }
    async toggleActive ( newState: boolean ) {
        throw Error( 'Not Implemented Yet' )
    }
    async update ( userId: number, newUser: User ) {
        const user = await prisma.user.update( {
            where: { id: userId }, data: {
                ...newUser,
                data_nascimento: convertDate( newUser.data_nascimento ) as Date
            }
        } )
        return newUser
    }
}
