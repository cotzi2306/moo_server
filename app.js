import express from 'express';
import cors from 'cors';

import { createBovinosRouter } from './routes/bovinos.js';
import { createUsersRouter } from './routes/users.js';
import { createFincasRouter} from './routes/fincas.js';

const corsOptions = {
    origin: "http://localhost:8081",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
}

export const createApp = ({bovinoModel, userModel, fincaModel }) => {
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.disable('x-powered-by');

    //Obtener información del usuario
//app.get("/users/:id", async (req, res) =>{
//    const user = await getUser(req.params.id);
//    res.status(200).send(user);
//});
//
//app.get("/users/:id/fincas", async (req, res) =>{
//    const fincas = await getFincasUser(req.params.id);
//    res.status(200).send(fincas);
//});

//app.post("/fincas", async (req, res) =>{
//    const result = validateFinca(req.body)
//
//    res.status(200).send(result);
//});
//
//app.get("/fincas/:id", async (req, res) =>{
//    const finca = await getFinca(req.params.id);
//    res.status(200).send(finca);
//});
//
//app.get("/fincas/:id/bovinos", async (req, res) =>{
//    const {filter, order} = req.query
//
//    if (order !== 'ASC' && order !== 'DESC' && order) {
//        return res.status(400).json({ error: 'Invalid order parameter' });
//      }
//    // todo: si el filtro no incluye un campo válido
//    // if (filter includes  )
//    const cows = await getBovinosFinca(req.params.id, filter, order);
//    
//    res.status(200).send(cows);
//});

//app.get("/bovinos/:id", async (req, res) =>{
//    const cow = await getBovino(req.params.id);
//    res.status(200).send(cow);
//});
//
//app.post('/bovinos', async (req, res) => {
//    const result = validateBovino(req.body)
//
//    if (result.error){
//        return res.status(400).json({error: JSON.parse(result.error.message)})
//    }
//
//    const newBovino = await addBovino({...result.data});
//    res.status(201).json({ newBovino , message: 'Bovino agregado exitosamente' });
//});
//
//app.patch('/bovinos/:id', async (req, res) => {
//    const result = validatePartialBovino(req.body)
//
//    if (result.error){
//        return res.status(400).json({error: JSON.parse(result.error.message)})
//    }
//
//    const id = req.params.id
//    const updatedBovino = await updateBovino(id, {...result.data})
//    res.status(201).json({ updatedBovino , message: 'Bovino editado exitosamente' });
    //})

    app.use('/bovinos', createBovinosRouter ({bovinoModel:bovinoModel}))
    app.use('/users', createUsersRouter ({userModel:userModel}))
    app.use('/fincas', createFincasRouter({fincaModel:fincaModel}))

    const PORT = process.env.PORT ?? 8080
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    });
}
