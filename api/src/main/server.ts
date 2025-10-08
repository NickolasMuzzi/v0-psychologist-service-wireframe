import express, { json, Request, Response } from 'express'
import { usersRouter } from '../infra'
const app = express()
const port = 3000

app.get( '/', ( req: Request, res: Response ) => {
    res.send( 'Olá, mundo com Node.js, Express e tsx!' )
} )
app.use(json())
app.use( usersRouter )
app.listen( port, () => {
    console.log( `Servidor rodando em http://localhost:${port}` )
} )
