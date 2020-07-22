import express, { Request, Response } from 'express'
import session from 'express-session'
import { join } from 'path'
import { graphqlHTTP } from 'express-graphql'
import { addResolversToSchema, loadSchemaSync, GraphQLFileLoader } from 'graphql-tools'

import { port, session_secret } from './config'
import { resolvers } from './graphql/resolvers'

const 
  app = express(),
  schema = loadSchemaSync(join(__dirname, './graphql/schema.graphql'), { loaders: [ new GraphQLFileLoader() ] })

// session
app.set('trust proxy', 1)
app.use(session({

  secret: session_secret,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true } // enable when HTTPS is available

}))

app.use('/graphql', graphqlHTTP({ schema: addResolversToSchema({

  schema,
  resolvers

}), graphiql: true }))

// 404
app.get('*', (req: Request, res: Response) => res.status(404).json({ error: true, message: '404 not found' }))

// start server
console.log('Starting server...')

app.listen(port, () => console.log('Started server...'))