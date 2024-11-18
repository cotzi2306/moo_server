import express from 'express';
import cors from 'cors';

import { createBovinosRouter } from './routes/bovinos.js';
import { createUsersRouter } from './routes/users.js';
import { createFincasRouter} from './routes/fincas.js';
import { createAuthRouter } from './routes/auth.js';
import cookieParser from 'cookie-parser';


const corsOptions = {
    //origin: ['*', 'http://localhost:8081'],
    origin: ["http://192.168.1.69:8081", "http://192.168.1.69:8081", "http://localhost:8081"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
}

export const createApp = ({bovinoModel, userModel, fincaModel, authModel}) => {
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.disable('x-powered-by');
    app.use(cookieParser());

    app.use('/bovinos', createBovinosRouter ({bovinoModel:bovinoModel}))
    app.use('/users', createUsersRouter ({userModel:userModel}))
    app.use('/fincas', createFincasRouter({fincaModel:fincaModel}))
    app.use('/auth', createAuthRouter({authModel:authModel}))

    const PORT = process.env.PORT ?? 8080
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    });
}
