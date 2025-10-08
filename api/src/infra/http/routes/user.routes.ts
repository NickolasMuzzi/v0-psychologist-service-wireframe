import { Router } from 'express'
const usersRouter = Router()
import { PrismaUsersRepository } from '../../repositories/users.repository'
import { CreateUserService } from '../../../services/user/createUserService'
import { UsersController } from '../controllers/users.controllers'
import { UserSchema } from '../../../domain/dtos/userDTO'
import { validate } from '../middlewares/validateBody'

const usersRoutes = Router()

const prismaUsersRepository = new PrismaUsersRepository()
const createUserService = new CreateUserService( prismaUsersRepository )
const usersController = new UsersController( createUserService )

usersRouter.post( '/', validate( UserSchema ), ( req, res ) => usersController.handleCreateUser )


export { usersRouter }
