import express, {Express} from 'express';
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import session from 'express-session';
import connectSessionSeq from 'connect-session-sequelize'

import { AuthResolver } from "../modules/auth/authResolver";
import { PostResolver } from "../modules/post/postResolver";


import { sequelize } from '../db/models'

let app: Express;

const main = async () => {

    app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors());

    sequelize.authenticate()
        .then(() => console.log('Connected to DB!!'))
        .catch((error) => {
            throw error
        })

    const SequelizeStore = connectSessionSeq(session.Store);
    const sessionStore = new SequelizeStore({
        db: sequelize,
    })
    sessionStore.sync()
    
    app.use(
        session({
            secret: "dpr secret",
            store: sessionStore,
            saveUninitialized: true,
            resave: false,
            proxy: true
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [AuthResolver, PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
}

main().catch((err) => {
    console.error(err);
});

export default app;