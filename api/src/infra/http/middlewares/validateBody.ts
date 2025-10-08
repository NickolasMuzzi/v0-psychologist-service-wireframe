import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'

// Função de alta ordem: ela retorna outra função (o middleware em si)
export function validate ( schema: ZodSchema ) {
    return ( req: Request, res: Response, next: NextFunction ) => {
        try {
            // Tenta validar o corpo da requisição com o esquema fornecido
            schema.parse( req.body )
            // Se a validação for bem-sucedida, continua para o próximo handler (o controller)
            next()
        } catch ( error ) {
            // Se a validação falhar, o Zod lança um ZodError
            if ( error instanceof ZodError ) {
                // Formata os erros para uma resposta amigável
                const errorMessages = error.issues.map( ( issue ) => ( {
                    field: issue.path.join( '.' ),
                    message: issue.message,
                } ) )
                return res.status( 400 ).json( { errors: errorMessages } )
            }
            // Para outros tipos de erro, retorna um erro genérico
            return res.status( 500 ).json( { message: 'Internal Server Error' } )
        }
    }
}
