import { DateTime } from "luxon"

export interface User {
    nome: string
    idade: number
    cpf: string
    sexo: string
    email: string
    telefone: string
    data_nascimento: DateTime
 
}
