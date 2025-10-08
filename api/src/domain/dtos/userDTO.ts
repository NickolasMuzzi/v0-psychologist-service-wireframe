import { z } from 'zod'
import { isValidCpf } from '../../utils/validateCpf'

export const UserSchema = z.object( {
    nome: z.string()
        .nonempty( { message: 'O nome é obrigatório.' } )
        .min( 3, { message: 'O nome deve ter no mínimo 3 caracteres.' } ),

    idade: z.number()
        .int()
        .positive()
        .max( 120, { message: 'A idade máxima permitida é 120.' } ),

    cpf: z.string()
        .nonempty( { message: 'O CPF é obrigatório.' } )
        .refine( isValidCpf, {
            message: 'CPF Inválido.',
        } ),

    sexo: z.enum( ['Masculino', 'Feminino', 'Outro'], {
        message: 'O sexo é obrigatório.',
    } ),

    email: z.string()
        .nonempty( { message: 'O email é obrigatório.' } )
        .email( { message: 'Formato de email inválido.' } ),

    telefone: z.string()
        .nonempty( { message: 'O telefone é obrigatório.' } )
        .regex( /^\(\d{2}\) \d{4,5}-\d{4}$/, { message: 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.' } ),

    data_nascimento: z.string()
        .nonempty( { message: 'A data de nascimento é obrigatória' } )
        .refine(
            ( date ) => /^\d{2}-\d{2}-\d{4}$/.test( date ),
            { message: 'Formato de data inválido. Use DD-MM-YYYY.' }
        )

} )

export type UserDTO = z.infer<typeof UserSchema>
