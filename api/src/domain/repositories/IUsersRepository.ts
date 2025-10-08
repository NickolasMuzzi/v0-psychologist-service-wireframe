import { User } from "../models/user"

export interface IUserRepository {
    findByEmail: ( email: string ) => Promise<User | null>
    toggleActive: ( newState: boolean ) => Promise<void>
    create: ( user: User ) => Promise<void>
    update: ( userId: number, newUser: User ) => Promise<User | null>
}
